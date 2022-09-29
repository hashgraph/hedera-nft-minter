import { useCallback, useContext, useMemo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  TransactionReceipt,
  TransactionReceiptQuery,
  TransactionResponse,
} from '@hashgraph/sdk';
import { MessageTypes } from 'hashconnect';
import { HederaWalletsContext } from '@utils/context/HederaWalletsContext';
import { SigningService } from '@/services/SigningService';

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
    clearPairedAccountsAndHashPackWalletData,
    clearConnectedBladeWalletData,
    connectToHashPack,
    hashConnectSaveData,
  } = useContext(HederaWalletsContext);

  const { accountsIds } = hashConnectSaveData;

  const [connectedWalletType, setConnectedWalletType] =
    useState<ConnectionStateType>(ConnectionStateType.NOCONNECTION);

  useEffect(() => {
    if (!bladeAccountId && accountsIds?.length === 0) {
      setConnectedWalletType(ConnectionStateType.NOCONNECTION);
    }
    if (bladeAccountId && accountsIds?.length === 0) {
      setConnectedWalletType(ConnectionStateType.BLADEWALLET);
    }
    if (accountsIds?.length > 0 && !bladeAccountId) {
      setConnectedWalletType(ConnectionStateType.HASHPACK);
    }
  }, [bladeAccountId, accountsIds, setConnectedWalletType]);

  const connect = useCallback(
    (walletType) => {
      switch (walletType) {
        case ConnectionStateType.BLADEWALLET:
          clearPairedAccountsAndHashPackWalletData();
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
      clearPairedAccountsAndHashPackWalletData,
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
        clearPairedAccountsAndHashPackWalletData();
        toast.error('❌ Removed HashPack pairings.');
        break;
      default:
        clearConnectedBladeWalletData();
        clearPairedAccountsAndHashPackWalletData();
        toast.error('❌ Removed pairings.');
        break;
    }
  }, [
    connectedWalletType,
    clearConnectedBladeWalletData,
    clearPairedAccountsAndHashPackWalletData,
  ]);

  const userWalletId = useMemo(() => {
    switch (connectedWalletType) {
      case ConnectionStateType.BLADEWALLET:
        return bladeAccountId;
      case ConnectionStateType.HASHPACK:
        return hashConnectSaveData?.accountsIds[0];
      case ConnectionStateType.NOCONNECTION:
        return undefined;
    }
  }, [connectedWalletType, bladeAccountId, hashConnectSaveData.accountsIds]);

  const sendTransaction = useCallback(
    async (tx, sign = false) => {
      if (!userWalletId) {
        throw new Error('Loading logged Hedera account id Error.');
      }

      let response:
        | MessageTypes.TransactionResponse
        | TransactionResponse
        | undefined;

      switch (connectedWalletType) {
        case ConnectionStateType.BLADEWALLET:
          // eslint-disable-next-line no-case-declarations
          response = (await bladeSigner?.sendRequest(
            tx
          )) as TransactionResponse;

          if (!response) {
            throw new Error('Get transaction response error');
          }

          return bladeSigner?.sendRequest(
            new TransactionReceiptQuery({
              transactionId: response.transactionId,
            })
          );
        case ConnectionStateType.HASHPACK:
          if (!hashConnectSaveData.topic) {
            throw new Error('Loading topic Error.');
          }

          // eslint-disable-next-line no-case-declarations,no-undef
          let txBytes = new Buffer([]);

          if (sign) {
            txBytes = await SigningService.makeBytes(tx, userWalletId);
          } else {
            txBytes = tx.toBytes();
          }

          // eslint-disable-next-line no-case-declarations
          response = await hashConnect?.sendTransaction(
            hashConnectSaveData.topic,
            {
              topic: hashConnectSaveData.topic,
              byteArray: txBytes,
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
      hashConnectSaveData.topic,
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
  };
};

export default useHederaWallets;
