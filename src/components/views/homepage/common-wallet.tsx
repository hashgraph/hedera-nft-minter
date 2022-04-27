import React, { useContext, useEffect } from 'react';
import { HashConnectContext } from '@utils/context/HashConnectContext';

const CommonWallet = () => {
  const context = useContext(HashConnectContext);
  const { hashConnect } = context;
  const { saveData } = hashConnect;

  useEffect(() => {
    hashConnect?.mount();
    return () => hashConnect?.unMount();
  }, [hashConnect]);
  return (
    <>
      <button onClick={() => hashConnect?.init()}>Init</button>
      <button onClick={() => hashConnect?.connect()}>Connect</button>
      <button
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log(context);
        }}
      >
        Context
      </button>
      <button
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log(saveData);
        }}
      >
        destructured saveData
      </button>

      <button
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log(context?.hashConnect?.saveData);
        }}
      >
        context.hashConnect.saveData
      </button>
      <p>
        Topic:
        {context?.hashConnect?.saveData?.topic ||
          'Nie znaleziono topica w saveData'}
      </p>
    </>
  );
};

export default CommonWallet;
