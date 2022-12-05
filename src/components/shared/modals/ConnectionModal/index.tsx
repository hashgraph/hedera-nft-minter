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

import { useMemo } from 'react';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import useHederaWallets, { ConnectionStateType } from '@utils/hooks/useHederaWallets';
import ConnectToWalletButton from '@components/shared/modals/ConnectionModal/ConnectToWalletButton'
import BladeWalletLogo from '@assets/images/wallets/bladewallet.svg'
import HashpackWalletLogo from '@assets/images/wallets/hashpack.svg'

export default function ConnectionModal() {
  const { userWalletId, isIframeParent } = useHederaWallets();

  const isHashPackConnectionButtonEnabledInDAppExplorer = useMemo(() => (
    // When user is using HashPack 'dApp explorer' enable button only for disconnect
    isIframeParent && !!userWalletId
  ), [isIframeParent, userWalletId])

  const isHashPackConnectionComponentEnabled = useMemo(() => {
    if (!isIframeParent && !isMobile) {
      return true
    }
    
    if (isIframeParent) {
      return isHashPackConnectionButtonEnabledInDAppExplorer
    }

    return false
  }, [isIframeParent, isHashPackConnectionButtonEnabledInDAppExplorer])

  const buttonsWrapperClassName = useMemo(() => (
    classNames('connection-modal__buttons-wrapper', {
      'connection-modal__buttons-wrapper--single': isIframeParent
    })
  ), [isIframeParent])

  return (
    <div className='connection-modal'>
      <div className={buttonsWrapperClassName}>
        <ConnectToWalletButton
          walletType={ConnectionStateType.HASHPACK}
          logoImageSrc={HashpackWalletLogo}
          isEnabled={isHashPackConnectionComponentEnabled}
        />

        {!isIframeParent && (
          <ConnectToWalletButton
            walletType={ConnectionStateType.BLADEWALLET}
            logoImageSrc={BladeWalletLogo}
            isEnabled={!isMobile}
          />
        )}
      </div>
    </div>
  );
}
