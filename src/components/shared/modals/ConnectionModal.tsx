import { useCallback } from 'react';
import useHederaWallets from '@/utils/hooks/useHederaWallets';

const ConnectionModal = () => {
  const { userWalletId, connectedWalletType, connect, disconnect } =
    useHederaWallets();

  const connectToHashpack = useCallback(() => connect('hashpack'), [connect]);
  const connectToBladewallet = useCallback(
    () => connect('bladewallet'),
    [connect]
  );

  return (
    <>
      <p>
        {connectedWalletType !== 'noconnection' &&
          `Connected to ${ connectedWalletType }.`}
      </p>
      <h4>
        {connectedWalletType !== 'noconnection' && `Hedera ID: ${ userWalletId }`}
      </h4>
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
      <div className='modal__disconnection-buttons-wrapper'>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    </>
  );
};

export default ConnectionModal;
