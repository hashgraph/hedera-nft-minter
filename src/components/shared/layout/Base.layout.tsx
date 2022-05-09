import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import useHashConnect from '@hooks/useHashConnect';
import Modal from '@components/shared/modal';

export const BaseLayout: FC = ({ children }) => {
  const { connected, saveData: { accountIds }, connect } = useHashConnect();

  return (
    <>
      <header>
        <Link to='/'>
          <h1>NFT Minter</h1>
        </Link>

        <div className='header__buttons-wrapper'>
          <Link to='/my-wallet'>My Wallet</Link>
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
