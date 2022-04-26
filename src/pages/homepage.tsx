import React, { useCallback } from 'react';
import { Formik } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import CommonWallet from '@components/views/homepage/common-wallet';

export default function Homepage() {
  const handleFormSubmit = useCallback(() => new Promise(() => null), []);
  return (
    <div>
      <CommonWallet />
      <Formik
        initialValues={{}}
        onSubmit={handleFormSubmit}
        component={NFTForm}
      />
    </div>
  );
}
