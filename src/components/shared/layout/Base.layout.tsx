import React, { FC } from 'react';
import useHashConnect from '@hooks/useHashConnect';

export const BaseLayout: FC = ({ children }) => {
  const { connected, saveData: { accountIds }, connect } = useHashConnect();

  return (
    <>
      <header>
        <h1>NFT Minter</h1>

        <button onClick={connect}>
          {connected && accountIds?.length ? accountIds[0] : 'Connect wallet'}
        </button>
      </header>

      <main className=''>
        {children}
      </main>
    </>
  );
};
