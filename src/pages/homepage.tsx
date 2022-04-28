import React, { useCallback } from 'react';
import { Formik } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import CommonWallet from '@components/views/homepage/common-wallet';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import IPFS from '@/services/IPFS';
import { toast } from 'react-toastify';

type FormValues = NFTMetadata & { symbol?: string };

export default function Homepage() {
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

  const handleFormSubmit = useCallback(async (values) => {
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
      // const metaCID = data.value.cid;
      // create token
      // mint token

      // eslint-disable-next-line no-console
      console.log({ data });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log({ e });
      toast.error(e.message);
    }
  }, []);
  return (
    <div className='homepage'>

      <div className='hero'>
        <div>
          <p>Mint your own NFT at speed of light!</p>
        </div>
      </div>

      <CommonWallet />


      <div className='container'>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          component={NFTForm}
        />
      </div>
    </div>
  );
}
