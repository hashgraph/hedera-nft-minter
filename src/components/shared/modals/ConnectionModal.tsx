import { useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import useHederaWallets from '@/utils/hooks/useHederaWallets';

export default function ConnectionModal() {
  const { userWalletId, connectedWalletType, connect, disconnect } =
    useHederaWallets();

  const history = useHistory();

  const connectToHashpack = useCallback(() => connect('hashpack'), [connect]);
  const connectToBladewallet = useCallback(
    () => connect('bladewallet'),
    [connect]
  );

  const handleGoToSettings = useCallback(()=>{
    history.push('/settings');
  },[history])

  return (
    <>
      <h2>
        {connectedWalletType !== 'noconnection' && `Hedera ID: ${ userWalletId }`}
      </h2>
      <div className='modal__connection-buttons-wrapper'>
        {connectedWalletType !== 'bladewallet' && (
          <button onClick={connectToBladewallet}>
            {connectedWalletType === 'hashpack' ? 'Switch' : 'Connect'} to
            BladeWallet
          </button>
        )}
        {connectedWalletType !== 'hashpack' && (
          <button onClick={connectToHashpack}>
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
