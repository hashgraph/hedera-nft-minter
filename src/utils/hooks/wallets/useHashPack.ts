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

import {
  HEDERA_NETWORK,
  HASHPACK_APP_CONFIG_NAME,
  HASHPACK_APP_CONFIG_DESCRIPTION,
  HASHPACK_APP_CONFIG_ICON_URL
} from '@src/../Global.d';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import { HashConnectConnectionState } from 'hashconnect/dist/types';
import useHashConnectEvents from '@utils/hooks/wallets/useHashConnectEvents';

export interface HashConnectState {
  availableExtension: HashConnectTypes.WalletMetadata;
  state: HashConnectConnectionState;
  topic: string;
  pairingString: string;
  pairingData: HashConnectTypes.SavedPairingData | null;
}

const HASHCONNECT_DEBUG_MODE = true;

const hashConnect = new HashConnect(HASHCONNECT_DEBUG_MODE);

const useHashPack = () => {
  const [hashConnectState, setHashConnectState] = useState<Partial<HashConnectState>>({});
  const { isIframeParent } = useHashConnectEvents(hashConnect, setHashConnectState)

  // PREPARE APP CONFIG
  const hederaNetworkPrefix = useMemo(() => (
    HEDERA_NETWORK === 'testnet' ? `${ HEDERA_NETWORK }.` : ''
  ), [])

  const appConfig = useMemo<HashConnectTypes.AppMetadata>(() => ({
    name: `${ hederaNetworkPrefix }${ HASHPACK_APP_CONFIG_NAME }`,
    description: HASHPACK_APP_CONFIG_DESCRIPTION,
    icon: HASHPACK_APP_CONFIG_ICON_URL ?? `${ window.location.protocol }//${ window.location.host }/logo.svg`
  }), [hederaNetworkPrefix])

  //INITIALIZATION
  const initializeHashConnect = useCallback(async () => {
    const hashConnectInitData = await hashConnect.init(appConfig, HEDERA_NETWORK, false);

    if (hashConnectInitData.savedPairings.length > 0) {
      setHashConnectState(prev => ({
        ...prev,
        topic: hashConnectInitData.topic,
        pairingString: hashConnectInitData.pairingString,
        pairingData: hashConnectInitData.savedPairings[0]
      }))
    } else {
      setHashConnectState(prev => ({
        ...prev,
        topic: hashConnectInitData.topic,
        pairingString: hashConnectInitData.pairingString,
      }))
    }
  }, [appConfig]);

  useEffect(() => {
    initializeHashConnect()
  }, [initializeHashConnect])

  //DISCONNECT
  const disconnectFromHashPack = useCallback(async () => {
    if (hashConnectState.topic) {
      await hashConnect.disconnect(hashConnectState.topic)

      setHashConnectState(prev => ({
        ...prev,
        pairingData: undefined
      }))
      hashConnect.hcData.pairingData = []
      
      if (isIframeParent) {
        await hashConnect.clearConnectionsAndData();
      }
    }
  }, [hashConnectState.topic, isIframeParent]);

  //CONNECT
  const connectToHashPack = useCallback(() => {
    try {
      if (typeof hashConnect.hcData.pairingString === 'undefined' || hashConnect.hcData.pairingString === '' ) {
        throw new Error(
          'No pairing key generated! Initialize HashConnect first!'
        );
      }

      if (!hashConnectState.availableExtension || !hashConnect) {
        throw new Error('Hashpack wallet is not installed!');
      }

      hashConnect.connectToLocalWallet();
    } catch (e) {
      if (typeof e === 'string') {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }, [hashConnectState.availableExtension]);

  return {
    hashConnect,
    hashConnectState,
    connectToHashPack,
    disconnectFromHashPack,
    isIframeParent
  };
};

export default useHashPack;
