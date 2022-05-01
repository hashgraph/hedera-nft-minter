import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import IPFS from '@/services/IPFS';
import HTS from '@/services/HTS';
import { SigningService } from '@/services/SigningService';
import { toast } from 'react-toastify';
import useHashConnect from '@hooks/useHashConnect';
import { TransactionReceipt } from '@hashgraph/sdk';

type FormValues = NFTMetadata & { symbol?: string };

export default function Homepage() {
  const { hashConnect, saveData } = useHashConnect();
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
  };

  const filterParams = useCallback((values: FormValues): FormValues => (
    Object.keys(values).reduce<Record<string, any>>(
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
    ) as FormValues
  ), []);

  const uploadNFTFile = useCallback(async (file): Promise<{}> => {
    const { data } = await IPFS.uploadFile(file);
    return data;
  }, []);

  const uploadMetadata = useCallback(async (metadata): Promise<{}> => {
    const { data } = await IPFS.createMetadataFile(metadata);
    return data;
  }, []);

  const createToken = useCallback(async (tokenName: string, tokenSymbol: string, accountId: string): string => {
    const token = await HTS.createToken(tokenName, tokenSymbol, accountId);
    const transactionBytes = await SigningService.makeBytes(
      token,
      accountId
    );

    const res = await hashConnect?.sendTransaction(saveData.topic, {
      topic: saveData.topic,
      byteArray: transactionBytes,
      metadata: {
        accountToSign: accountId,
        returnTransaction: false,
      },
    });

    if (!res) {
      throw new Error('Create Token Error.');
    }


    const receipt = TransactionReceipt.fromBytes(res.receipt as Uint8Array);

    if (!receipt && !receipt.tokenId) {
      throw new Error('Get Transaction Receipt error');
    }

    return receipt.tokenId;
  }, [hashConnect, saveData.topic]);

  const mint = useCallback(async (tokenId: string, meta: string) => {
    const acc1 = saveData.accountIds[0] || '0.0.0';
    const topic = saveData && saveData.topic ? saveData.topic : '';

    const txMint = HTS.mintToken(tokenId, acc1, meta, 0);

    const mintResult = await hashConnect?.sendTransaction(topic, {
      topic,
      byteArray: txMint.toBytes(),
      metadata: {
        accountToSign: acc1,
        returnTransaction: false,
      }
    });

    if (!mintResult) {
      throw new Error('Token mint failed.');
    }

    return TransactionReceipt.fromBytes(mintResult.receipt as Uint8Array)
  }, [hashConnect, saveData])

  const handleFormSubmit = useCallback(
    async (values) => {
      const filteredValues = filterParams(values);
      const accountId = saveData && saveData.accountIds ? saveData.accountIds[0] : '';
      const topic = saveData && saveData.topic ? saveData.topic : '';

      try {
        if (!values.image) {
          throw new Error('You need to select a file to upload');
        }

        if (!accountId || !topic) {
          throw new Error('First you need connect your wallet');
        }

        // upload image
        const imageData = await uploadNFTFile(values.image);
        // replace image with IMAGE_CID

        filteredValues.image = imageData.value.cid;
        // upload metadata
        const metadata = await uploadMetadata(filteredValues);
        // create token
        const tokenId  = await createToken(values.name, values.symbol, accountId);
        setTokenId(tokenId);
        // mint
        const mintRes = await mint(tokenId, metadata.value.cid);


        // eslint-disable-next-line no-console
        console.log({ mintRes });

        setTokenCreated(true)

        // mint token
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log({ e });
        toast.error(e.message);
      }
    },
    [createToken, filterParams, mint, saveData, uploadMetadata, uploadNFTFile]
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
          />
        )}
      </div>
    </div>
  );
}
