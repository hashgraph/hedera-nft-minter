import { useCallback, useContext } from 'react';
import useHederaWallets from '@/utils/hooks/useHederaWallets';
import { ModalContext } from './../../../utils/context/ModalContext';

export default function ConnectionModal() {
  const { userWalletId, connectedWalletType, connect, disconnect } =
    useHederaWallets();

  const {closeModal} = useContext(ModalContext)

  const connectToWallet = useCallback((walletType : 'hashpack' | 'bladewallet') => {
    connect(walletType)
    closeModal();
  }, [closeModal, connect])

  return (
    <>
      <h2>
        {connectedWalletType !== 'noconnection' && `Hedera ID: ${ userWalletId }`}
      </h2>
      <div className='modal__connection-buttons-wrapper'>
        {connectedWalletType !== 'bladewallet' && (
          <button onClick={() => connectToWallet('bladewallet')}>
            {connectedWalletType === 'hashpack' ? 'Switch' : 'Connect'} to
            BladeWallet
          </button>
        )}
        {connectedWalletType !== 'hashpack' && (
          <button onClick={() => connectToWallet('hashpack')}>
            {connectedWalletType === 'bladewallet' ? 'Switch' : 'Connect'} to
            HashPack
          </button>
        )}
      </div>
      {userWalletId && (
        <div className='modal__disconnection-buttons-wrapper'>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}
    </>
  );
}
