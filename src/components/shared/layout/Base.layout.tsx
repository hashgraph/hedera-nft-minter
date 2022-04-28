import React, { FC } from 'react';
import useHashConnect from '@hooks/useHashConnect';

export const BaseLayout: FC = ({ children }) => {
  const { connected, saveData: { accountIds } } = useHashConnect();

  return (
    <>
      <header>
        <h1>NFT Minter</h1>

        <button>
          {connected ? accountIds[0] : 'Connect wallet'}
        </button>
      </header>

      <main className=''>
        {children}
      </main>
    </>
  );
};
