import React, { FC } from 'react';

export const BaseLayout: FC = ({ children }) => {
  return (
    <>
      <header>
        <h1>NFT Minter</h1>

        <button>
          Connect Wallet
        </button>
      </header>

      <main className=''>
        {children}
      </main>
    </>
  );
};
