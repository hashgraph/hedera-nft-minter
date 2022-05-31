import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, FormikValues } from 'formik';
import { TokenId } from '@hashgraph/sdk';
import pick from 'lodash/pick';
import { HEDERA_NETWORK } from '@/../Global.d';

import IPFS from '@/services/IPFS';
import HTS, { AccountInfo, NewTokenType } from '@/services/HTS';

import { initialValues } from '@utils/const/nft-form';
import useHederaWallets from '@hooks/useHederaWallets';

import NFTForm from '@components/views/homepage/nft-form';
import { ValidationSchema } from '@components/views/homepage/nft-form-validation-schema';
import Hero from '@/components/shared/layout/Hero';
import PageMenu from '@/components/shared/layout/PageMenu';

export default function Homepage() {
  const { userWalletId, sendTransaction } = useHederaWallets();
  const [tokenCreated, setTokenCreated] = useState(false);
  const [tokenId, setTokenId] = useState('');

  const filterParams = useCallback((values) => {
    let filtred = pick(values, [
      'name',
      'type',
      'creator',
      'creatorDID',
      'description',
      'image',
      'files',
      'format',
      'attributes',
    ]) as FormikValues;

    filtred.format = 'opensea';

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

    return filtred
  }, []);

  const uploadNFTFile = useCallback(async (file) => {
    const { data } = await IPFS.uploadFile(file);
    return data;
  }, []);

  const uploadMetadata = useCallback(async (metadata) => {
    const { data } = await IPFS.createMetadataFile(metadata);
    return data;
  }, []);

  const createToken = useCallback(async (values: NewTokenType): Promise<TokenId | null> => {
      const createTokenTx = await HTS.createToken(values);
      const createTokenResponse = await sendTransaction(createTokenTx, true);

      if (!createTokenResponse) {
        throw new Error('Create Token Error.');
      }

      return createTokenResponse.tokenId;
    },
    [sendTransaction]
  );

  const mint = useCallback(async (tokenId: string, cids: string[]) => {
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

  const handleFormSubmit = useCallback(async (values) => {
    const tokenSymbol = values.symbol;
    delete values.symbol;

    const filteredValues = filterParams(values);

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
        filteredValues.type = values.image.type;
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
        `https://${ HEDERA_NETWORK }.mirrornode.hedera.com/api/v1/accounts/${ userWalletId }`,
        { method: 'GET' }
      );

      accountInfo = await accountInfo.json();

      if (!accountInfo.key) {
        throw new Error(
          'Error when loading user key from hedera mirrornode API(testnet)!'
        );
      }

      // create token
      const tokenId = await createToken({
        tokenSymbol,
        accountId: userWalletId,
        tokenName: values.name,
        amount: values.qty,
        keys: values.keys,
        customFees: values.fees,
        maxSupply: values.maxSupply
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
    mint,
    uploadMetadata,
    uploadNFTFile,
    userWalletId,
  ]);

  return (
    <div className='homepage'>
      <Hero title={'Mint your own NFT on Hedera'}>
        <p>
          Minting NFTs on Hedera is fast and simple. You can mint
          new NFTs and Collections without using smart contracts.
        </p>
        <a
          href='https://hedera.com/token-service'
          target={'_blank'}
          className='btn btn--invert'
        >
          HEDERA TOKEN SERVICE DOCUMENTATION
        </a>
      </Hero>
      <PageMenu />
        <div className='homepage__container'>
          {tokenCreated ? (
            <div className='homepage__token-created__container'>
              <h1>Token Created successfully</h1>
              <p>Your new NFT Token ID: <b>{tokenId}</b></p>
              <a
                href={`https://https://app.dragonglass.me/hedera/tokens/${ tokenId }`}
                target='_blank'
              >
                Link to your token in <i>app.dragonglass.me</i>
              </a>
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
