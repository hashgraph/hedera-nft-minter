import React, { FC } from 'react';
import useHashConnect from '@hooks/useHashConnect';
import Modal from '@components/shared/modal';

export const BaseLayout: FC = ({ children }) => {
  const { connected, saveData: { accountIds }, connect } = useHashConnect();

  return (
    <>
      <header>
        <h1>NFT Minter</h1>

        <div className='header__buttons-wrapper'>
          <button onClick={connect}>
            {connected ? accountIds[0] : 'Connect wallet'}
          </button>
        </div>
      </header>

      <main className=''>
        {children}
        <Modal />
      </main>
    </>
  );
};
