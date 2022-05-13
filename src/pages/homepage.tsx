import React, { useCallback, useState } from 'react';
import { Formik, FormikValues } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import IPFS from '@/services/IPFS';
import HTS, { Fee, NewTokenType } from '@/services/HTS';
import { toast } from 'react-toastify';
import useHederaWallets from '@hooks/useHederaWallets';
import {
  TransactionReceipt,
  TokenId,
  CustomFee,
  CustomFixedFee,
  Hbar,
  CustomRoyaltyFee,
  CustomFractionalFee,
  HbarUnit,
} from '@hashgraph/sdk';
import { ValidationSchema } from '@components/views/homepage/nft-form-validation-schema';
import _ from 'lodash';
import { keyChecker } from '@/utils/helpers/nftFormKeyChecker';

type RequiredKey = 'account' | 'custom';
export type OptionalKey = 'no' | RequiredKey;
export type FeeKey = 'royaltyFee' | 'fractionalFee' | 'fixedFee';

export type FormValues = NFTMetadata & {
  symbol?: string;
  qty: number;
  treasury: RequiredKey;
  treasury_account_id?: string;
  kyc: OptionalKey;
  kyc_key?: string | 'account_key';
  admin: OptionalKey;
  admin_key?: string | 'account_key';
  freeze: OptionalKey;
  freeze_key?: string | 'account_key';
  wipe: OptionalKey;
  wipe_key?: string | 'account_key';
  supply: OptionalKey;
  supply_key?: string | 'account_key';
  pause: OptionalKey;
  pause_key?: string | 'account_key';
  fees: FeeKey[];
  activeFees: {
    royaltyFee?: Fee;
    fractionalFee?: Fee;
    fixedFee?: Fee;
  };
};

type Property = {
  name: string;
  value: string;
};

export default function Homepage() {
  const { userWalletId, sendTransaction } = useHederaWallets();
  const [tokenCreated, setTokenCreated] = useState(false);
  const [tokenId, setTokenId] = useState('');
  const initialValues: FormValues = {
    name: '',
    symbol: '',
    creator: '',
    creatorDID: '',
    description: '',
    type: '',
    image: null,
    files: [],
    properties: [
      {
        name: 'website',
        value: 'www.mywebsite.com',
      },
      {
        name: 'license',
        value: 'Creative Common',
      },
    ],
    attributes: [
      {
        trait_type: 'hair',
        value: 'blue',
      },
      {
        trait_type: 'size',
        value: 'large',
      },
    ],
    qty: 1,
    treasury: 'account',
    kyc: 'no',
    admin: 'no',
    freeze: 'no',
    wipe: 'no',
    supply: 'account',
    pause: 'no',
    treasury_account_id: '',
    kyc_key: '',
    admin_key: '',
    freeze_key: '',
    wipe_key: '',
    supply_key: '',
    pause_key: '',
    fees: [],
    activeFees: {
      fractionalFee: {
        feeCollectorAccountId: '',
        numerator: 0,
        denominator: 0,
        min: 0,
        max: 0,
        assessmentMethod: 'inclusive',
      },
      royaltyFee: {
        feeCollectorAccountId: '',
        fallbackFee: 0,
        numerator: 0,
        denominator: 0,
      },
      fixedFee: {
        feeCollectorAccountId: '',
        denominatingTokenId: '',
        amount: 0,
        hbarAmount: 0,
      },
    },
  };

  const createFees = useCallback(async (activeFees, data) => {
    const createFee = async (feeName: string | number, value: Fee) => {
      let fee;
      let fallback;
      switch (feeName) {
        case 'fixedFee':
          fee = await new CustomFixedFee({
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
          fee = await new CustomFractionalFee({
            feeCollectorAccountId: value.feeCollectorAccountId,
            numerator: value.numerator,
            denominator: value.denominator,
            min: value.min,
            max: value.max,
            assessmentMethod: value.assessmentMethod === 'exclusive',
          });
          return fee;

        case 'royaltyFee':
          fallback = await new CustomFixedFee()
            .setFeeCollectorAccountId(value.feeCollectorAccountId)
            .setHbarAmount(Hbar.from(value.fallbackFee ?? 0, HbarUnit.Hbar));

          fee = await new CustomRoyaltyFee({
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
      let ac: any = {};
      for (let i = 0; i < activeFees.length; i++) {
        ac = { ...ac, [activeFees[i]]: data[activeFees[i]] };
      }
      return ac;
    });
    const filtredValues: CustomFee[] = [];
    for (const key in activeFees) {
      const newFee = await createFee(key, activeFees[key]);
      filtredValues.push(newFee as CustomFee);
    }
    return filtredValues;
  }, []);

  const filterParams = useCallback((values) => {
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

    filtred.properties =
      filtred.properties.length > 0 &&
      filtred.properties.reduce((a: Property, b: Property, step: number) => {
        if (step === 1) {
          return {
            [a.name]: a.value,
            [b.name]: b.value,
          };
        }
        return {
          ...a,
          [b.name]: b.value,
        };
      });

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

    return filtred;
  }, []);

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
      const token = await HTS.createToken(values);
      const res = (await sendTransaction(token)) as TransactionReceipt & {
        receipt: Uint8Array;
      };

      if (!res) {
        throw new Error('Create Token Error.');
      }

      const receipt = TransactionReceipt.fromBytes(res.receipt);

      if (!receipt) {
        throw new Error('Get Transaction Receipt error');
      }

      if (!receipt.tokenId) {
        throw new Error('Get Token ID error');
      }

      return receipt.tokenId;
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
      const customFees = await createFees(values.fees, values.activeFees);
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
          Array.from(new Array(values.qty)).map(() =>
            uploadMetadata(filteredValues)
          )
        );

        // create token
        const tokenId = await createToken({
          accountId: userWalletId,
          tokenName: values.name,
          tokenSymbol,
          amount: values.qty,
          admin_key: keyChecker(values, 'admin'),
          freeze_key: keyChecker(values, 'freeze'),
          kyc_key: keyChecker(values, 'kyc'),
          supply_key: keyChecker(values, 'supply'),
          wipe_key: keyChecker(values, 'wipe'),
          pause_key: keyChecker(values, 'pause'),
          treasury_account_id:
            values.treasury === 'custom'
              ? values.treasury_account_id
              : userWalletId,
          customFees,
        });

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
      <div className='hero'>
        <div>
          <p>Mint your own NFT at speed of light!</p>
        </div>
      </div>
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
  );
}
