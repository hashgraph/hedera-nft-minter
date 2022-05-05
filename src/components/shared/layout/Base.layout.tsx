import React, { FC, useCallback } from 'react';
import Modal from '@components/shared/modal';
import useHederaWallets from '@/utils/hooks/useHederaWallets';

export const BaseLayout: FC = ({ children }) => {
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
    <>
      <header>
        <h1>NFT Minter</h1>

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
      </header>

      <main className=''>
        {children}
        <Modal />
      </main>
    </>
  );
};
