import React, { useCallback, useContext } from 'react';
import { Formik } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import { HashConnectContext } from '@utils/context/HashConnectContext';

export default function Homepage () {
  const { initHashconnect } = useContext(HashConnectContext);
  const handleFormSubmit = useCallback(() => new Promise(() => null), []);

  return (
    <div>
      <div>
        <button onClick={initHashconnect}>
          Connect Wallet
        </button>
      </div>

      <Formik
        initialValues={{}}
        onSubmit={handleFormSubmit}
        component={NFTForm}
      />
    </div>
  )
}
