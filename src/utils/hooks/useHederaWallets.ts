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
  BLADEWALLET= 'bladewallet',
  HASHPACK= 'hashpack',
  NOCONNECTION= 'noconnection',
}

const useHederaWallets = () => {
  const {
    bladeWallet: {
      activeBladeWalletAccountId,
      disconnectFromBladeWallet,
      createBladeWalletSession,
      sendTransactionWithBladeWallet,
    },
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
    if (!activeBladeWalletAccountId && !hashConnectState.pairingData) {
      setConnectedWalletType(ConnectionStateType.NOCONNECTION);
    }
    if (activeBladeWalletAccountId && !hashConnectState.pairingData) {
      setConnectedWalletType(ConnectionStateType.BLADEWALLET);
    }
    if (hashConnectState.pairingData && hashConnectState.pairingData.accountIds?.length > 0 && !activeBladeWalletAccountId) {
      setConnectedWalletType(ConnectionStateType.HASHPACK);
    }
  }, [activeBladeWalletAccountId, setConnectedWalletType, hashConnectState.pairingData]);

  const connect = useCallback(async (walletType) => {
    try {
      switch (walletType) {
        case ConnectionStateType.BLADEWALLET: {
          await disconnectFromHashPack();
          await createBladeWalletSession();
          break;
        }

        case ConnectionStateType.HASHPACK: {
          if (activeBladeWalletAccountId) {
            await disconnectFromBladeWallet();
          }

          connectToHashPack();

          break;
        }
      }
    } catch (e) {
      if (typeof e === 'string') {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }, [
    disconnectFromHashPack,
    createBladeWalletSession,
    activeBladeWalletAccountId,
    connectToHashPack,
    disconnectFromBladeWallet
  ]);

  const disconnect = useCallback(() => {
    switch (connectedWalletType) {
      case ConnectionStateType.BLADEWALLET:
        disconnectFromBladeWallet();
        toast.error('❌ Removed Blade Wallet pairing.');
        break;
      case ConnectionStateType.HASHPACK:
        disconnectFromHashPack();
        toast.error('❌ Removed HashPack pairings.');
        break;
      default:
        disconnectFromBladeWallet();
        disconnectFromHashPack();
        toast.error('❌ Removed pairings.');
        break;
    }
  }, [
    connectedWalletType,
    disconnectFromBladeWallet,
    disconnectFromHashPack,
  ]);

  const userWalletId = useMemo(() => {
    switch (connectedWalletType) {
      case ConnectionStateType.BLADEWALLET:
        return activeBladeWalletAccountId;
      case ConnectionStateType.HASHPACK:
        return hashConnectState.pairingData?.accountIds && hashConnectState.pairingData?.accountIds[0]
      case ConnectionStateType.NOCONNECTION:
        return undefined;
    }
  }, [connectedWalletType, activeBladeWalletAccountId, hashConnectState]);

  const sendTransaction = useCallback(async (tx) => {
    if (!userWalletId) {
      throw new Error('No connected Hedera account detected!.');
    }

    switch (connectedWalletType) {
      case ConnectionStateType.BLADEWALLET:
        return await sendTransactionWithBladeWallet(tx);

      case ConnectionStateType.HASHPACK:
        return await sendTransactionWithHashPack(tx);

      case ConnectionStateType.NOCONNECTION:
        throw new Error('No wallet connected!');
    }
  }, [
    userWalletId,
    connectedWalletType,
    sendTransactionWithBladeWallet,
    sendTransactionWithHashPack
  ]);

  return {
    userWalletId,
    connectedWalletType,
    connect,
    disconnect,
    sendTransaction,
    isIframeParent
  };
};

export default useHederaWallets;
