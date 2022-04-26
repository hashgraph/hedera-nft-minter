import React, { useCallback, useContext } from 'react';
import { Formik } from 'formik';
import NFTForm from '@components/views/homepage/nft-form';
import CommonWallet from '@components/views/homepage/common-wallet';
import { HashConnectContext } from '@utils/context/HashConnectContext';

export default function Homepage() {
  const {
    saveData,
    installedExtensions,
    connectToHashpack,
    clearHashpackPairings,
    initializeHashConnect,
  } = useContext(HashConnectContext);

  const handleFormSubmit = useCallback(() => new Promise(() => null), []);

  return (
    <div>
      <CommonWallet
        functions={{
          walletData: saveData,
          installedExtensions,
          initializeHashConnect,
          connect: connectToHashpack,
          clearPairings: clearHashpackPairings,
        }}
      />

      <Formik
        initialValues={{}}
        onSubmit={handleFormSubmit}
        component={NFTForm}
      />
    </div>
  );
}
