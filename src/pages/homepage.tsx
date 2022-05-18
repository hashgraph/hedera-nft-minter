import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { Formik, FormikValues } from 'formik';
import {
  TokenId,
  CustomFee,
  CustomFixedFee,
  Hbar,
  CustomRoyaltyFee,
  CustomFractionalFee,
  HbarUnit,
} from '@hashgraph/sdk';
import { toast } from 'react-toastify';

import IPFS from '@/services/IPFS';
import HTS, { AccountInfo, Fee, NewTokenType } from '@/services/HTS';
import useHederaWallets from '@hooks/useHederaWallets';
import { nftFormKeysGenerator } from '@/utils/helpers/nftFormKeysGenerator';
import { initialValues } from '@utils/const/nft-form';

import NFTForm from '@components/views/homepage/nft-form';
import { ValidationSchema } from '@components/views/homepage/nft-form-validation-schema';
import Hero from '@/components/shared/layout/Hero';
import PageMenu from '@/components/shared/layout/PageMenu';

export default function Homepage() {
  const { userWalletId, sendTransaction } = useHederaWallets();
  const [tokenCreated, setTokenCreated] = useState(false);
  const [tokenId, setTokenId] = useState('');

  const createFees = useCallback((activeFees, data) => {
    const createFee = (feeName: string | number, value: Fee) => {
      let fee;
      let fallback;
      switch (feeName) {
        case 'fixedFee':
          fee = new CustomFixedFee({
            feeCollectorAccountId: value.feeCollectorAccountId,
          });
          if (!!value.denominatingTokenId && !!value.amount) {
            fee
              .setAmount(value.amount)
              .setDenominatingTokenId(value.denominatingTokenId);
          } else {
            fee.setHbarAmount(
              Hbar.from(value.hbarAmount as number, HbarUnit.Hbar)
            );
          }
          return fee;

        case 'fractionalFee':
          fee = new CustomFractionalFee({
            feeCollectorAccountId: value.feeCollectorAccountId,
            numerator: value.numerator,
            denominator: value.denominator,
            min: value.min,
            max: value.max,
            assessmentMethod: value.assessmentMethod === 'exclusive',
          });
          return fee;

        case 'royaltyFee':
          fallback = new CustomFixedFee()
            .setFeeCollectorAccountId(value.feeCollectorAccountId)
            .setHbarAmount(Hbar.from(value.fallbackFee ?? 0, HbarUnit.Hbar));

          fee = new CustomRoyaltyFee({
            feeCollectorAccountId: value.feeCollectorAccountId,
            numerator: value.numerator,
            denominator: value.denominator,
            fallbackFee: fallback,
          });
          return fee;

        default:
          return;
      }
    };

    activeFees = [[...activeFees], data].reduce((activeFees) => {
      let activeFee = {} as Fee;
      for (let i = 0; i < activeFees.length; i++) {
        activeFee = { ...activeFee, [activeFees[i]]: data[activeFees[i]] };
      }
      return activeFee;
    });

    const filtredValues: CustomFee[] = [];
    for (const key in activeFees) {
      const newFee = createFee(key, activeFees[key]);
      if (newFee) {
        filtredValues.push(newFee);
      }
    }
    return filtredValues;
  }, []);

  const filterParams = useCallback(
    (values) => {
      let filtred = _.pick(values, [
        'name',
        'type',
        'creator',
        'creatorDID',
        'description',
        'image',
        'files',
        'format',
        'properties',
        'attributes',
      ]) as FormikValues;

      filtred.format = 'opensea';

      const filtredProperties = {} as { [key: string]: string };
      for (const [, value] of filtred.properties.entries()) {
        filtredProperties[`${ value.name }`] = value.value;
      }
      filtred.properties = filtredProperties;

      filtred = Object.keys(filtred).reduce(
        (params: FormikValues, paramName: string) => {
          if (
            (!Array.isArray(filtred[paramName]) && filtred[paramName]) ||
            (Array.isArray(filtred[paramName]) && filtred[paramName].length > 0)
          ) {
            params[paramName] = filtred[paramName];
          }

          return params;
        },
        {}
      );
    },

    []
  );

  const uploadNFTFile = useCallback(async (file) => {
    const { data } = await IPFS.uploadFile(file);
    return data;
  }, []);

  const uploadMetadata = useCallback(async (metadata) => {
    const { data } = await IPFS.createMetadataFile(metadata);
    return data;
  }, []);

  const createToken = useCallback(
    async (values: NewTokenType): Promise<TokenId | null> => {
      const createTokenTx = await HTS.createToken(values);
      const createTokenResponse = await sendTransaction(createTokenTx, true);

      if (!createTokenResponse) {
        throw new Error('Create Token Error.');
      }

      return createTokenResponse.tokenId;
    },
    [sendTransaction]
  );

  const mint = useCallback(
    async (tokenId: string, cids: string[]) => {
      if (!userWalletId) {
        throw new Error('Error with loading logged account data!');
      }
      const tokenMintTx = HTS.mintToken(tokenId, userWalletId, cids);

      const tokenMintResponse = await sendTransaction(tokenMintTx);

      if (!tokenMintResponse) {
        throw new Error('Token mint failed.');
      }

      return tokenMintResponse;
    },
    [userWalletId, sendTransaction]
  );

  const handleFormSubmit = useCallback(
    async (values) => {
      const tokenSymbol = values.symbol;
      delete values.symbol;

      const filteredValues = filterParams(values);
      const customFees = createFees(values.fees, values.activeFees);
      try {
        if (!userWalletId) {
          throw new Error('First connect your wallet');
        }
        //upload image
        if (values.image) {
          const imageData = await uploadNFTFile(values.image);
          if (!imageData.ok) {
            throw new Error('Error when uploading NFT File!');
          }
          //add required image type metadata field
          filteredValues.type = values.image.type;
          //replace image with IMAGE_CID
          filteredValues.image = imageData.value.cid;
        }

        // upload metadata
        const metaCIDs = await Promise.all(
          Array.from(new Array(parseInt(values.qty))).map(() =>
            uploadMetadata(filteredValues)
          )
        );

        //Fetch account data
        let accountInfo: AccountInfo = await window.fetch(
          'https://testnet.mirrornode.hedera.com/api/v1/accounts/' +
            userWalletId,
          { method: 'GET' }
        );

        accountInfo = await accountInfo.json();

        if (!accountInfo.key) {
          throw new Error(
            'Error when loading user key from hedera mirrornode API(testnet)!'
          );
        }

        //Filter form keys
        const filteredKeys = nftFormKeysGenerator(values, accountInfo.key.key);

        const treasuryAccountId =
          values.treasury === 'custom'
            ? values.treasury_account_id
            : userWalletId;

        // create token
        const tokenId = await createToken({
          accountId: userWalletId,
          tokenName: values.name,
          amount: values.qty,
          tokenSymbol,
          ...filteredKeys,
          treasuryAccountId,
          customFees,
        } as NewTokenType);

        if (!tokenId) {
          throw new Error('Error! Problem with creating token!');
        }

        //check if is string
        const tokenIdToMint = tokenId.toString();
        setTokenId(tokenIdToMint);

        // mint
        const mintRes = await mint(
          tokenIdToMint,
          metaCIDs.map(({ value }) => value.cid)
        );

        // eslint-disable-next-line no-console
        console.log({ mintRes });

        setTokenCreated(true);

        // mint token
      } catch (e) {
        if (typeof e === 'string') {
          toast.error(e);
        } else if (e instanceof Error) {
          toast.error(e.message);
        }
      }
    },
    [
      createToken,
      filterParams,
      createFees,
      mint,
      uploadMetadata,
      uploadNFTFile,
      userWalletId,
    ]
  );

  return (
    <div className='homepage'>
      <Hero title={'Mint your own NFT at speed of light!'}>
        <p>
          Proin eget tortor risus. Praesent sapien massa, convallis a
          pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui
          posuere blandit.
        </p>
        <a
          href='https://hedera.com/token-service'
          target={'_blank'}
          className='btn btn--invert'
        >
          TOKEN DOCUMENTATION
        </a>
      </Hero>
      <PageMenu />
      <div className='black-background'>
        <div className='container'>
          {tokenCreated ? (
            <div>
              <h2>Token Created successfully</h2>
              <p>Your new NFT Token ID: {tokenId}</p>
            </div>
          ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={handleFormSubmit}
              component={NFTForm}
              validationSchema={ValidationSchema}
            />
          )}
        </div>
      </div>
    </div>
  );
}
