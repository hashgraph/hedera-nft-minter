import React, { FC, useCallback, useContext } from 'react';
import useHashConnect from '@hooks/useHashConnect';
import Modal from '@components/shared/modal';
import { ModalContext } from '@/utils/context/ModalContext';
import CommonWallet from '@/components/views/homepage/common-wallet';

export const BaseLayout: FC = ({ children }) => {
  const {
    connect,
    connected,
    saveData: { accountIds },
  } = useHashConnect();

  const { showModal, setModalContent } = useContext(ModalContext);

  const prepareAndShowModal = useCallback(() => {
    setModalContent(<CommonWallet />);
    showModal();
  }, [showModal, setModalContent]);

  const handleButtonClick = useCallback(() => {
    connected ? prepareAndShowModal : connect;
    if (connected) {
      return prepareAndShowModal();
    }
    connect();
  }, [connected, connect, prepareAndShowModal]);

  return (
    <>
      <header>
        <h1>NFT Minter</h1>

        <div className='header__buttons-wrapper'>
          <button onClick={handleButtonClick}>
            {connected ? accountIds[0] : 'Connect wallet'}
          </button>
        </div>
      </header>

      <main className=''>
        <Modal />
        {children}
      </main>
    </>
  );
};
