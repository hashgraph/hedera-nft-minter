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
import BladeWalletLogo from '@assets/images/wallets/bladewallet.svg'
import HashpackWalletLogo from '@assets/images/wallets/hashpack.svg'

export default function ConnectionModal() {
  const { userWalletId, connectedWalletType, connect, disconnect, isIframeParent } =
    useHederaWallets();

  const {closeModal} = useContext(ModalContext)

  const connectToWallet = useCallback((walletType : ConnectionStateType.HASHPACK | ConnectionStateType.BLADEWALLET) => {
    connect(walletType)
    closeModal();
  }, [closeModal, connect])

  const notConnectedConnectionComponentContent = useCallback((
    walletType : ConnectionStateType.HASHPACK | ConnectionStateType.BLADEWALLET,
    isEnabled: boolean,
  ) => {
    const walletName = walletType === ConnectionStateType.HASHPACK ? 'HashPack' : 'BladeWallet'

    if (isIframeParent && walletType === ConnectionStateType.HASHPACK) {
      return 'You need to reset dApp to connect again'
    }

    if (isMobile) {
      if (walletType === ConnectionStateType.HASHPACK) {
        return `Log in using the ${ walletName } mobile dApp explorer`
      }

      if (walletType === ConnectionStateType.BLADEWALLET) {
        return `${ walletName } not supported on mobile`
      }
    }

    const enabledButtonContent = (userWalletId && walletType !== connectedWalletType) ? (
      `Switch to ${ walletName }`
    ) : (
      'Click to connect'
    )

    return (
      isEnabled ? (
        enabledButtonContent
      ) : (
        'Coming soon'
      )
    )
  }, [connectedWalletType, isIframeParent, userWalletId])

  const renderConnectionComponentContent = useCallback((
    walletType: ConnectionStateType.HASHPACK | ConnectionStateType.BLADEWALLET,
    isEnabled: boolean
  ) => {
    const logoImageSrc = walletType === ConnectionStateType.BLADEWALLET ? BladeWalletLogo : HashpackWalletLogo

    return (
      <>
        <img src={logoImageSrc} alt={walletType} />
        {connectedWalletType === walletType
          ? (
            <p>Disconnect from account { userWalletId }</p>
          ) : (
            <p>{notConnectedConnectionComponentContent(walletType, isEnabled)}</p>
          )
        }
      </>
    )
  }, [connectedWalletType, notConnectedConnectionComponentContent, userWalletId])

  const handleConnectionButtonOnClick = useCallback((walletType: ConnectionStateType.HASHPACK | ConnectionStateType.BLADEWALLET) => (
    connectedWalletType === walletType ? (
      disconnect
    ) : (
      () => connectToWallet(walletType)
    )
  ), [connectToWallet, connectedWalletType, disconnect])

  const generateConnectionComponentProps = useCallback((
    walletType: ConnectionStateType.HASHPACK | ConnectionStateType.BLADEWALLET,
    isEnabled: boolean
  ) => ({
    className: classNames('connection-modal__button', { 'connection-modal__button--disabled': !isEnabled }),
    onClick: (
      isEnabled ? (
        handleConnectionButtonOnClick(walletType)
      ) : (
        () => undefined
      )
    ),
    children: renderConnectionComponentContent(walletType, isEnabled)
  }), [handleConnectionButtonOnClick, renderConnectionComponentContent])

  const renderConnectionComponent = useCallback((
    walletType: ConnectionStateType.HASHPACK | ConnectionStateType.BLADEWALLET,
    isEnabled = true,
  ) => (
    isEnabled ? (
      <button {...generateConnectionComponentProps(walletType, isEnabled)}/>
    ) : (
      <span {...generateConnectionComponentProps(walletType, isEnabled)}/>
    )
  ), [generateConnectionComponentProps])

  const isHashPackConnectionComponentEnabled = useMemo(() => (
    isIframeParent ? (
      !!userWalletId
    ) : (
      !isMobile
    )
  ), [userWalletId, isIframeParent])

  const buttonsWrapperClassName = useMemo(() => (
    classNames('connection-modal__buttons-wrapper', {
      'connection-modal__buttons-wrapper--single': isIframeParent
    })
  ), [isIframeParent])

  return (
    <div className='connection-modal'>
      <div className={buttonsWrapperClassName}>
        {renderConnectionComponent(ConnectionStateType.HASHPACK, isHashPackConnectionComponentEnabled)}
        {!isIframeParent && renderConnectionComponent(ConnectionStateType.BLADEWALLET, !isMobile)}
      </div>
    </div>
  );
}
