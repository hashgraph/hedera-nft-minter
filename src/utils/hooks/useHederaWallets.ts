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
    useState<ConnectionStateType>('noconnection');

  useEffect(() => {
    if (!bladeAccountId && accountsIds?.length === 0) {
      setConnectedWalletType('noconnection');
    }
    if (bladeAccountId && accountsIds?.length === 0) {
      setConnectedWalletType('bladewallet');
    }
    if (accountsIds?.length > 0 && !bladeAccountId) {
      setConnectedWalletType('hashpack');
    }
  }, [bladeAccountId, accountsIds, setConnectedWalletType]);

  const connect = useCallback(
    (walletType) => {
      switch (walletType) {
        case 'bladewallet':
          clearPairedAccountsAndHashPackWalletData();
          connectBladeWallet();
          break;
        case 'hashpack':
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
      case 'bladewallet':
        clearConnectedBladeWalletData();
        toast.error('❌ Removed Blade Wallet pairing.');
        break;
      case 'hashpack':
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
      case 'bladewallet':
        return bladeAccountId;
      case 'hashpack':
        return hashConnectSaveData?.accountsIds[0];
      case 'noconnection':
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
        case 'bladewallet':
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
        case 'hashpack':
          if (!hashConnectSaveData.topic) {
            throw new Error('Loading topic Error.');
          }

          // eslint-disable-next-line no-case-declarations,no-undef
          let txBytes: Uint8Array = new Buffer([]);
          if (sign) {
            txBytes = await SigningService.makeBytes(tx, userWalletId);
          } else {
            txBytes = tx.toBytes();
          }

          // eslint-disable-next-line no-case-declarations
          response = (await hashConnect?.sendTransaction(
            hashConnectSaveData.topic,
            {
              topic: hashConnectSaveData.topic,
              byteArray: txBytes,
              metadata: {
                accountToSign: userWalletId,
                returnTransaction: false,
              },
            }
          )) as MessageTypes.TransactionResponse;

          return TransactionReceipt.fromBytes(
            response.receipt as Uint8Array
          ) as TransactionReceipt;

        case 'noconnection':
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
