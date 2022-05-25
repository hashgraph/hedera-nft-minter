import { useCallback } from 'react';
import useHederaWallets from '@/utils/hooks/useHederaWallets';

export default function ConnectionModal() {
  const { userWalletId, connectedWalletType, connect, disconnect } =
    useHederaWallets();

  const connectToHashpack = useCallback(() => connect('hashpack'), [connect]);
  const connectToBladewallet = useCallback(
    () => connect('bladewallet'),
    [connect]
  );

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
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}
    </>
  );
}
