import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import useHederaWallets from '@/utils/hooks/useHederaWallets';
import { ModalContext } from './../../../utils/context/ModalContext';

export default function ConnectionModal() {
  const { userWalletId, connectedWalletType, connect, disconnect } =
    useHederaWallets();

  const {closeModal} = useContext(ModalContext)

  const history = useHistory();

  const connectToWallet = useCallback((walletType : 'hashpack' | 'bladewallet') => {
    connect(walletType)
    closeModal();
  }, [closeModal, connect])

  const handleGoToSettings = useCallback(()=>{
    history.push('/settings');
    closeModal();
  },[history, closeModal])

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
          <button onClick={handleGoToSettings}>Go to settings</button>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}
    </>
  );
}
