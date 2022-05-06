import React, { FC, useCallback, useContext, useEffect } from 'react';
import Modal from '@components/shared/modal';
import useHederaWallets from '@/utils/hooks/useHederaWallets';
import { ModalContext } from '@utils/context/ModalContext';

const ConnectionModal = () => {
  const {
    isHashPackConnected,
    isBladeWalletConnected,
    saveData: { hashConnectAccountIds, bladeAccountId },
    connectToHashPack,
    connectBladeWallet,
    clearHashPackPairings,
    clearBladeWalletPairing,
  } = useHederaWallets();
  const handleBladeWalletAccount = useCallback(
    () =>
      isBladeWalletConnected ? clearBladeWalletPairing() : connectBladeWallet(),
    [isBladeWalletConnected, connectBladeWallet, clearBladeWalletPairing]
  );

  const handleHashPackAccount = useCallback(
    () => (isHashPackConnected ? clearHashPackPairings() : connectToHashPack()),
    [isHashPackConnected, clearHashPackPairings, connectToHashPack]
  );
  return (
    <div className='header__buttons-wrapper'>
      <button onClick={handleBladeWalletAccount}>
        {isBladeWalletConnected
          ? `BladeWallet: ${ bladeAccountId }`
          : 'Connect BladeWallet'}
      </button>

      <button onClick={handleHashPackAccount}>
        {isHashPackConnected
          ? `HashPack: ${ hashConnectAccountIds[0] }`
          : 'Connect HashPack'}
      </button>
    </div>
  );
};

export const BaseLayout: FC = ({ children }) => {
  const { showModal, setModalContent } = useContext(ModalContext);
  const { connectedWalletType } = useHederaWallets();

  useEffect(() => {
    setModalContent(<ConnectionModal />);
  }, [setModalContent]);

  return (
    <>
      <header>
        <h1>NFT Minter</h1>
        <button onClick={showModal}>{connectedWalletType}</button>
      </header>

      <main className=''>
        {children}
        <Modal />
      </main>
    </>
  );
};
