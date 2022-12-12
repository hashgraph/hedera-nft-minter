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
import {
  TransactionReceipt,
  TransactionReceiptQuery,
  TransactionResponse,
} from '@hashgraph/sdk';
import { MessageTypes } from 'hashconnect';
import { HederaWalletsContext } from '@utils/context/HederaWalletsContext';
import { SigningService } from '@services/SigningService';

export enum ConnectionStateType {
  BLADEWALLET= 'bladewallet',
  HASHPACK= 'hashpack',
  NOCONNECTION= 'noconnection',
}

const useHederaWallets = () => {
  const {
    bladeSigner,
    bladeAccountId,
    hashConnect,
    connectBladeWallet,
    disconnectFromHashPack,
    clearConnectedBladeWalletData,
    connectToHashPack,
    hashConnectState,
    isIframeParent
  } = useContext(HederaWalletsContext);

  const [connectedWalletType, setConnectedWalletType] =
    useState<ConnectionStateType>(ConnectionStateType.NOCONNECTION);

  useEffect(() => {
    if (!bladeAccountId && !hashConnectState.pairingData) {
      setConnectedWalletType(ConnectionStateType.NOCONNECTION);
    }
    if (bladeAccountId && !hashConnectState.pairingData) {
      setConnectedWalletType(ConnectionStateType.BLADEWALLET);
    }
    if (hashConnectState.pairingData && hashConnectState.pairingData.accountIds?.length > 0 && !bladeAccountId) {
      setConnectedWalletType(ConnectionStateType.HASHPACK);
    }
  }, [bladeAccountId, setConnectedWalletType, hashConnectState.pairingData]);

  const connect = useCallback(
    (walletType) => {
      switch (walletType) {
        case ConnectionStateType.BLADEWALLET:
          disconnectFromHashPack();
          connectBladeWallet();
          break;
        case ConnectionStateType.HASHPACK:
          clearConnectedBladeWalletData();
          connectToHashPack();
          break;
      }
    },
    [
      connectBladeWallet,
      connectToHashPack,
      disconnectFromHashPack,
      clearConnectedBladeWalletData,
    ]
  );

  const disconnect = useCallback(() => {
    switch (connectedWalletType) {
      case ConnectionStateType.BLADEWALLET:
        clearConnectedBladeWalletData();
        toast.error('❌ Removed Blade Wallet pairing.');
        break;
      case ConnectionStateType.HASHPACK:
        disconnectFromHashPack();
        toast.error('❌ Removed HashPack pairings.');
        break;
      default:
        clearConnectedBladeWalletData();
        disconnectFromHashPack();
        toast.error('❌ Removed pairings.');
        break;
    }
  }, [
    connectedWalletType,
    clearConnectedBladeWalletData,
    disconnectFromHashPack,
  ]);

  const userWalletId = useMemo(() => {
    switch (connectedWalletType) {
      case ConnectionStateType.BLADEWALLET:
        return bladeAccountId;
      case ConnectionStateType.HASHPACK:
        return hashConnectState.pairingData?.accountIds && hashConnectState.pairingData?.accountIds[0]
      case ConnectionStateType.NOCONNECTION:
        return undefined;
    }
  }, [connectedWalletType, bladeAccountId, hashConnectState]);

  const sendTransaction = useCallback(
    async (tx, sign = false) => {
      if (!userWalletId) {
        throw new Error('Loading logged Hedera account id Error.');
      }

      let response:
        | MessageTypes.TransactionResponse
        | TransactionResponse
        | undefined;

      let hashConnectTxBytes;

      switch (connectedWalletType) {
        case ConnectionStateType.BLADEWALLET:
          response = (await bladeSigner?.call(
            tx
          )) as TransactionResponse;

          if (!response) {
            throw new Error('Get transaction response error');
          }

          return bladeSigner?.call(
            new TransactionReceiptQuery({
              transactionId: response.transactionId,
            })
          );
        case ConnectionStateType.HASHPACK:
          if (!hashConnectState.topic) {
            throw new Error('Loading topic Error.');
          }

          hashConnectTxBytes = sign ? (
            SigningService.makeBytes(tx, userWalletId)
          ) : (
            tx.toBytes()
          );

          // eslint-disable-next-line no-case-declarations
          response = await hashConnect?.sendTransaction(
            hashConnectState.topic,
            {
              topic: hashConnectState.topic,
              byteArray: hashConnectTxBytes,
              metadata: {
                accountToSign: userWalletId,
                returnTransaction: false,
              },
            }
          );

          if (response?.receipt) {
            return TransactionReceipt.fromBytes(
              response.receipt as Uint8Array
            );
          } else {
            throw new Error('No transaction receipt found!');
          }

        case ConnectionStateType.NOCONNECTION:
          throw new Error('No wallet connected!');
      }
    },
    [
      hashConnect,
      connectedWalletType,
      userWalletId,
      hashConnectState.topic,
      bladeSigner,
    ]
  );

  return {
    bladeSigner,
    userWalletId,
    connectedWalletType,
    connect,
    disconnect,
    sendTransaction,
    isIframeParent
  };
};

export default useHederaWallets;
