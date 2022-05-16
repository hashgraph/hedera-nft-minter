import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import IPFS from '@/services/IPFS';
import HTS from '@/services/HTS';
import { toast } from 'react-toastify';
import useHederaWallets from '@hooks/useHederaWallets';
import { TokenId } from '@hashgraph/sdk';
import { ValidationSchema } from '@components/views/homepage/nft-form-validation-schema';
import Hero from '@/components/shared/layout/Hero';
import Navbar from '@/components/shared/layout/Navbar';

type FormValues = NFTMetadata & { symbol?: string; qty: number };

type Property = {
  name: string;
  value: string;
};

type Parameters = {
  properties: Property[];
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
    properties: [],
    qty: 1,
  };

  const filterParams = useCallback(
    (values) =>
      Object.keys(values).reduce<Record<string, Parameters | string>>(
        (params, paramName) => {
          if (
            (!Array.isArray(values[paramName]) && values[paramName]) ||
            (Array.isArray(values[paramName]) && values[paramName].length > 0)
          ) {
            params[paramName] = values[paramName];
          }

          return params;
        },
        {}
      ),
    []
  );

  const uploadNFTFile = useCallback(async (file) => {
    const { data } = await IPFS.uploadFile(file);
    return data;
  }, []);

  const uploadMetadata = useCallback(
    async (metadata, serial: number, hip: 'hip-10' | 'hip-214') => {
      if (hip === 'hip-214') {
        metadata = {
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          properties: metadata.properties,
        };
      }

      const { data } = await IPFS.createMetadataFile(metadata, serial);
      return data;
    },
    []
  );

  const createToken = useCallback(
    async (
      tokenName: string,
      tokenSymbol: string,
      accountId: string,
      amount: number
    ): Promise<TokenId | null> => {
      const createTokenTx = await HTS.createToken(
        tokenName,
        tokenSymbol,
        accountId,
        amount
      );
      const createTokenResponse = await sendTransaction(createTokenTx);

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
      const hip = values.hip;
      delete values.hip;

      const filteredValues = filterParams(values);

      try {
        if (!values.image) {
          throw new Error('You need to select a file to upload');
        }
        if (!userWalletId) {
          throw new Error('First connect your wallet');
        }

        // upload image
        const imageData = await uploadNFTFile(values.image);
        // replace image with IMAGE_CID
        if (!imageData.ok) {
          throw new Error('Error when uploading NFT File!');
        }

        filteredValues.image = imageData.value.cid;

        // upload metadata
        const metaCIDs = await Promise.all(
          Array.from(new Array(values.qty)).map((_, i) =>
            uploadMetadata(filteredValues, i, hip)
          )
        );

        // create token
        const tokenId = await createToken(
          values.name,
          values.symbol,
          userWalletId,
          values.qty
        );

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
        <button className='btn--invert'>TOKEN DOCUMENTATION</button>
      </Hero>
      <Navbar />
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
