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

import { useCallback, useContext, useMemo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { HederaWalletsContext } from '@utils/context/HederaWalletsContext';

export enum ConnectionStateType {
  HASHPACK = 'hashpack',
  BLADEWALLET = 'bladewallet',
  NOCONNECTION = 'noconnection',
}

const useHederaWallets = () => {
  const {
    hashPack: {
      disconnectFromHashPack,
      connectToHashPack,
      hashConnectState,
      sendTransactionWithHashPack,
      isIframeParent,
    },
  } = useContext(HederaWalletsContext);

  const [connectedWalletType, setConnectedWalletType] =
    useState<ConnectionStateType>(ConnectionStateType.NOCONNECTION);

  useEffect(() => {
    if (!hashConnectState.pairingData) {
      setConnectedWalletType(ConnectionStateType.NOCONNECTION);
    }
    if (
      hashConnectState.pairingData &&
      hashConnectState.pairingData.accountIds?.length > 0
    ) {
      setConnectedWalletType(ConnectionStateType.HASHPACK);
    }
  }, [setConnectedWalletType, hashConnectState.pairingData]);

  const connect = useCallback(
    async (walletType) => {
      try {
        if (walletType === ConnectionStateType.HASHPACK) {
          connectToHashPack();
        }
      } catch (e) {
        if (typeof e === 'string') {
          toast.error(e);
        } else if (e instanceof Error) {
          toast.error(e.message);
        }
      }
    },
    [connectToHashPack]
  );

  const disconnect = useCallback(() => {
    switch (connectedWalletType) {
      case ConnectionStateType.HASHPACK:
        disconnectFromHashPack();
        toast.error('❌ Removed HashPack pairings.');
        break;
      default:
        disconnectFromHashPack();
        toast.error('❌ Removed pairings.');
        break;
    }
  }, [connectedWalletType, disconnectFromHashPack]);

  const userWalletId = useMemo(() => {
    switch (connectedWalletType) {
      case ConnectionStateType.HASHPACK:
        return (
          hashConnectState.pairingData?.accountIds &&
          hashConnectState.pairingData?.accountIds[0]
        );
      default:
        return undefined;
    }
  }, [connectedWalletType, hashConnectState]);

  const sendTransaction = useCallback(
    async (tx) => {
      if (!userWalletId) {
        throw new Error('No connected Hedera account detected!.');
      }

      switch (connectedWalletType) {
        case ConnectionStateType.HASHPACK:
          return await sendTransactionWithHashPack(tx);

        default:
          throw new Error('No wallet connected!');
      }
    },
    [userWalletId, connectedWalletType, sendTransactionWithHashPack]
  );

  return {
    userWalletId,
    connectedWalletType,
    connect,
    disconnect,
    sendTransaction,
    isIframeParent,
  };
};

export default useHederaWallets;
