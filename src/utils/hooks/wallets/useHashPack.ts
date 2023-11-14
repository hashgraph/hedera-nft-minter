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
  WALLET_CONFIG_NAME,
  WALLET_CONFIG_DESCRIPTION,
  WALLET_CONFIG_ICON_URL,
} from '@src/../Global.d';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import { HashConnectConnectionState } from 'hashconnect/dist/types';
import useHashConnectEvents from '@utils/hooks/wallets/useHashConnectEvents';
import { AccountId, Transaction, TransactionId, TransactionReceipt } from '@hashgraph/sdk';

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
    name: `${ hederaNetworkPrefix }${ WALLET_CONFIG_NAME }`,
    description: WALLET_CONFIG_DESCRIPTION,
    icon: WALLET_CONFIG_ICON_URL ?? `${ window.location.protocol }//${ window.location.host }/logo.svg`
  }), [hederaNetworkPrefix])

  //INITIALIZATION
 const initializeHashConnect = useCallback(async () => {
    const hashConnectInitData = await hashConnect.init(appConfig, HEDERA_NETWORK, true);

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
    if (typeof hashConnect?.hcData?.pairingString === 'undefined' || hashConnect.hcData.pairingString === '' ) {
      throw new Error(
        'No pairing key generated! Initialize HashConnect first!'
      );
    }

    if (!hashConnectState?.availableExtension || !hashConnect) {
      throw new Error('Hashpack wallet is not detected!');
    }

    hashConnect.connectToLocalWallet();
  }, [hashConnectState.availableExtension]);

  //POPULATE TRANSACTION
  const populateTransaction = useCallback((tx: Transaction, accountToSign: string) => {
    const transId = TransactionId.generate(accountToSign);

    tx.setTransactionId(transId);
    tx.setNodeAccountIds([new AccountId(3)]);

    tx.freeze();

    return tx;
  }, [])

  //SEND TRANSACTION
  const sendTransactionWithHashPack = useCallback(async (tx: Transaction) => {
    if (!hashConnectState.topic) {
      throw new Error('Loading topic Error.');
    }

    if (!hashConnectState?.pairingData?.accountIds[0]) {
      throw new Error('No account paired with HashPack!');
    }

    tx = populateTransaction(
      tx,
      hashConnectState.pairingData.accountIds[0]
    );

    // eslint-disable-next-line no-case-declarations
    const response = await hashConnect?.sendTransaction(hashConnectState.topic, {
      topic: hashConnectState.topic,
      byteArray: tx.toBytes(),
      metadata: {
        accountToSign: hashConnectState.pairingData.accountIds[0],
        returnTransaction: false,
      },
    });

    if (response?.receipt) {
      return TransactionReceipt.fromBytes(response.receipt as Uint8Array);
    } else {
      throw new Error('No transaction receipt found!');
    }
  }, [hashConnectState?.pairingData?.accountIds, hashConnectState.topic, populateTransaction]);

  return {
    hashConnectState,
    connectToHashPack,
    disconnectFromHashPack,
    sendTransactionWithHashPack,
    isIframeParent
  };
};

export default useHashPack;
