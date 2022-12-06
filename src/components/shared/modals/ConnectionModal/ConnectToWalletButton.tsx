/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import useHederaWallets, { ConnectionStateType } from '@utils/hooks/useHederaWallets';
import { ModalContext } from '@utils/context/ModalContext';

export default function ConnectToWalletButton({
    isEnabled = true,
    walletType,
    logoImageSrc,
  }: {
    isEnabled?: boolean,
    walletType: ConnectionStateType.HASHPACK | ConnectionStateType.BLADEWALLET
    logoImageSrc?: string
}) {
  const { userWalletId, connectedWalletType, connect, disconnect, isIframeParent } = useHederaWallets();
  const { closeModal } = useContext(ModalContext)

  const connectToWalletButtonOnClick = useCallback(() => {
    if (!isEnabled) {
      return
    }
    
    if (connectedWalletType === walletType) {
      disconnect()
    } else {
      connect(walletType)
      closeModal();
    }
  }, [closeModal, connect, connectedWalletType, disconnect, isEnabled, walletType])

  const connectToWalletButtonImage = useMemo(() => (
    logoImageSrc ? (
      <img src={logoImageSrc} alt={`connect-to-wallet-button-${ walletType }-logo`} />
    ) : (
      null
    )
  ), [logoImageSrc, walletType])

  const walletName = useMemo(() => {
    switch (walletType) {
      case ConnectionStateType.HASHPACK:
        return 'HashPack'

      case ConnectionStateType.BLADEWALLET:
        return 'BladeWallet'

      default:
        return ''
    }
  }, [walletType])

  const connectToWalletButtonContent = useMemo(() => {
    if (isEnabled && connectedWalletType === walletType) {
      return `Disconnect from account ${ userWalletId }`
    }

    if (isIframeParent && walletType === ConnectionStateType.HASHPACK) {
      return 'Please login using the Hashpack DAPP explorer in the wallet'
    }

    if (isMobile) {
      if (walletType === ConnectionStateType.HASHPACK) {
        return `Log in using the ${ walletName } mobile dApp explorer`
      }

      if (walletType === ConnectionStateType.BLADEWALLET) {
        return `${ walletName } not supported on mobile`
      }
    }
    
    if (!isEnabled) {
      return 'Coming soon'
    }

    return (userWalletId && walletType !== connectedWalletType) ? (
      `Switch to ${ walletName }`
    ) : (
      'Click to connect'
    )
  }, [isEnabled, connectedWalletType, walletType, isIframeParent, userWalletId, walletName])

  const connectToWalletButtonClassNames = useMemo(() => (
    classNames('connection-modal__button', {
      'connection-modal__button--disabled': !isEnabled
    })
  ), [isEnabled])

  return (
    <button
      disabled={!isEnabled}
      className={connectToWalletButtonClassNames}
      onClick={connectToWalletButtonOnClick}
      type='button'
    >
      {connectToWalletButtonImage}
      <p>{connectToWalletButtonContent}</p>
    </button>
  )
}
