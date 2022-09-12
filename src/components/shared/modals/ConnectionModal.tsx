import { useCallback, useContext } from 'react';
import useHederaWallets, { ConnectionStateType } from '@/utils/hooks/useHederaWallets';
import { ModalContext } from '@utils/context/ModalContext';
import BladeWalletLogo from '@/assets/images/wallets/bladewallet.svg'
import HashpackWalletLogo from '@/assets/images/wallets/hashpack.svg'

export default function ConnectionModal() {
  const { userWalletId, connectedWalletType, connect, disconnect } =
    useHederaWallets();

  const {closeModal} = useContext(ModalContext)

  const connectToWallet = useCallback((walletType : ConnectionStateType.HASHPACK | ConnectionStateType.BLADEWALLET) => {
    connect(walletType)
    closeModal();
  }, [closeModal, connect])


  const renderHashpackConnectionButton = useCallback(() => (
    <button
      className='connection-modal__button'
      onClick={connectedWalletType === ConnectionStateType.HASHPACK
        ? disconnect
        : () => connectToWallet(ConnectionStateType.HASHPACK)
      }
    >
      <img src={HashpackWalletLogo} alt='hashpack_wallet' />
      {connectedWalletType === ConnectionStateType.NOCONNECTION
        ? (
          <p>Connect to app with HashPack wallet.</p>
        ) : (
          connectedWalletType === ConnectionStateType.HASHPACK
            ? (
              <>
                <p>Disconnect from account { userWalletId }</p>
              </>
            ) : (
                <p>Switch to HashPack wallet.</p>
            )
        )
      }
    </button>
  ), [connectToWallet, connectedWalletType, disconnect, userWalletId])

  const renderBladeWalletConnectionButton = useCallback(() => (
    <button
      className='connection-modal__button'
      onClick={connectedWalletType === ConnectionStateType.BLADEWALLET
        ? disconnect
        : () => connectToWallet(ConnectionStateType.BLADEWALLET)
      }
    >
      <img src={BladeWalletLogo} alt='blade_wallet' />
      {connectedWalletType === ConnectionStateType.NOCONNECTION
        ? (
          <p>Connect to app with BladeWallet.</p>
        ) : (
          connectedWalletType === ConnectionStateType.BLADEWALLET
            ? (
              <>
                <p>Disconnect from account { userWalletId }</p>
              </>
            ) : (
                <p>Switch to BladeWallet.</p>
            )
        )
      }
    </button>
  ), [connectToWallet, connectedWalletType, disconnect, userWalletId])

  return (
    <div className='connection-modal'>
      <div className='connection-modal__buttons-wrapper'>
        {renderHashpackConnectionButton()}
        {renderBladeWalletConnectionButton()}
      </div>
    </div>
  );
}
