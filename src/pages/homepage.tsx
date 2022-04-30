import React, { useCallback } from 'react';
import { Formik } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import IPFS from '@/services/IPFS';
import HTS from '@/services/HTS';
import { SigningService } from '@/services/SigningService';
import { toast } from 'react-toastify';
import useHashConnect from '@hooks/useHashConnect';
import { ValidationSchema } from '@components/views/homepage/nft-form-validation-schema';

type FormValues = NFTMetadata & { symbol?: string; qty: number };

export default function Homepage() {
  const { hashConnect, saveData } = useHashConnect();
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

  const handleFormSubmit = useCallback(
    async (values) => {
      const filteredValues = Object.keys(values).reduce<Record<string, any>>(
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
      ) as FormValues;

      try {
        if (!values.image) {
          throw new Error('You need to select a file to upload');
        }

        // upload image
        const { data: imageData } = await IPFS.uploadFile(values.image);
        // replace image with IMAGE_CID
        filteredValues.image = imageData.value.cid;
        delete filteredValues.symbol;
        // upload metadata
        const { data } = await IPFS.createMetadataFile(filteredValues);
        const metaCID = data.value.cid;
        // eslint-disable-next-line no-console
        console.log({ metaCID });
        // create token
        const token = HTS.createToken('test', 'test-PM');
        const accountId =
          saveData && saveData.accountIds ? saveData.accountIds[0] : '';
        const topic = saveData && saveData.topic ? saveData.topic : '';
        const transactionBytes = await SigningService.makeBytes(
          token,
          accountId
        );

        // eslint-disable-next-line no-console
        console.log({ transactionBytes });

        const res = await hashConnect?.sendTransaction(topic, {
          topic: topic,
          byteArray: transactionBytes,
          metadata: {
            accountToSign: accountId,
            returnTransaction: true,
          },
        });

        // eslint-disable-next-line no-console
        console.log({ res });

        // mint token
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log({ e });
        toast.error(e.message);
      }
    },
    [hashConnect, saveData]
  );

  return (
    <div className='homepage'>
      <div className='hero'>
        <div>
          <p>Mint your own NFT at speed of light!</p>
        </div>
      </div>

      <div className='container'>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          component={NFTForm}
          validationSchema={ValidationSchema}
        />
      </div>
    </div>
  );
}
