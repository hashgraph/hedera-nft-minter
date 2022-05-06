import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import IPFS from '@/services/IPFS';
import HTS from '@/services/HTS';
import { toast } from 'react-toastify';
import useHederaWallets from '@hooks/useHederaWallets';
import { TransactionReceipt, TokenId } from '@hashgraph/sdk';
import { ValidationSchema } from '@components/views/homepage/nft-form-validation-schema';

type FormValues = NFTMetadata & { symbol?: string; qty: number };

interface NFTFile {
  ok: boolean;
  value: {
    cid: string;
    created: string;
    deals?: [];
    files?: File[];
    name: string;
    pin?: {
      cid: string;
      created: string;
      size: number;
      status: string;
    };
    scope: string;
    size: number;
    type: string;
  };
}

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
    properties: [{ name: '', value: '' }],
    qty: 0,
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

  const uploadNFTFile = useCallback(async (file): Promise<NFTFile> => {
    const { data } = await IPFS.uploadFile(file);
    return data;
  }, []);

  const uploadMetadata = useCallback(async (metadata): Promise<NFTFile> => {
    const { data } = await IPFS.createMetadataFile(metadata);
    return data;
  }, []);

  const createToken = useCallback(
    async (
      tokenName: string,
      tokenSymbol: string,
      accountId: string
    ): Promise<TokenId | null> => {
      const token = await HTS.createToken(tokenName, tokenSymbol, accountId);
      const res = await sendTransaction(token);

      if (!res) {
        throw new Error('Create Token Error.');
      }

      const receipt = TransactionReceipt.fromBytes(
        res.receipt as Uint8Array
      ) as TransactionReceipt;

      if (!receipt) {
        throw new Error('Get Transaction Receipt error');
      }

      return receipt.tokenId;
    },
    [sendTransaction]
  );

  const mint = useCallback(
    async (tokenId: string, meta: string) => {
      if (!userWalletId) {
        throw new Error('Error with loading logged account data!');
      }
      const txMint = HTS.mintToken(tokenId, userWalletId, meta, 0);

      const mintResult = await sendTransaction(txMint, txMint.toBytes());

      if (!mintResult) {
        throw new Error('Token mint failed.');
      }

      return TransactionReceipt.fromBytes(mintResult.receipt as Uint8Array);
    },
    [userWalletId, sendTransaction]
  );

  const handleFormSubmit = useCallback(
    async (values) => {
      const filteredValues = filterParams(values);

      try {
        if (!values.image) {
          throw new Error('You need to select a file to upload');
        }
        if (!userWalletId) {
          toast.error('First connect your wallet!');
          throw new Error('First connect your wallet');
        }

        // upload image
        const imageData = await uploadNFTFile(values.image);
        // replace image with IMAGE_CID
        if (!imageData.ok) {
          toast.error('Error when uploading NFT File!');
          throw new Error('Error when uploading NFT File!');
        }

        filteredValues.image = imageData.value.cid;

        // upload metadata
        const metadata = await uploadMetadata(filteredValues);

        // create token
        const tokenId = await createToken(
          values.name,
          values.symbol,
          userWalletId
        );
        if (!tokenId) {
          toast.error('Error when creating new token!');
          throw new Error('Error! Problem with creating token!');
        }

        //check if is string
        const tokenIdToMint =
          tokenId instanceof TokenId ? tokenId.toString() : tokenId;
        setTokenId(tokenIdToMint);

        // mint
        const mintRes = await mint(tokenIdToMint, metadata.value.cid);

        // eslint-disable-next-line no-console
        console.log({ mintRes });

        setTokenCreated(true);

        // mint token
      } catch (e) {
        if (typeof e === 'string') {
          toast.error(e);
          throw new Error(e);
        } else if (e instanceof Error) {
          toast.error(e.message);
          throw new Error(e.message);
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
