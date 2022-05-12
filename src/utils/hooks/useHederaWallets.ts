import { useCallback, useContext, useMemo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { HederaWalletsContext } from '@utils/context/HederaWalletsContext';
import { MessageTypes } from 'hashconnect';
import { SigningService } from '@/services/SigningService';
import { Transaction } from '@hashgraph/sdk';

const useHederaWallets = () => {
  const {
    // bladeSigner,
    bladeAccountId,
    hashConnect,
    connectBladeWallet,
    clearPairedAccountsAndHashPackWalletData,
    clearConnectedBladeWalletData,
    connectToHashPack,
    hashConnectSaveData,
  } = useContext(HederaWalletsContext);

  const { accountsIds } = hashConnectSaveData;

  const [connectedWalletType, setConnectedWalletType] = useState<
    'bladewallet' | 'hashpack' | 'noconnection'
  >('noconnection');
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

  const sign = useCallback(
    (tx: MessageTypes.Transaction) => {
      if (!hashConnectSaveData.topic) {
        throw new Error('Connect wallet first.');
      }

      return hashConnect?.sendTransaction(hashConnectSaveData.topic, tx);
    },
    [hashConnect, hashConnectSaveData]
  );

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
        toast('❌ Removed Blade Wallet pairing.');
        break;
      case 'hashpack':
        clearPairedAccountsAndHashPackWalletData();
        toast('❌ Removed HashPack pairings.');
        break;
      default:
        clearConnectedBladeWalletData();
        clearPairedAccountsAndHashPackWalletData();
        toast('❌ Removed pairings.');
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
    async (tx, txBytes = undefined) => {
      if (!userWalletId) {
        throw new Error('Loading logged Hedera account id Error.');
      }
      switch (connectedWalletType) {
        case 'bladewallet':
          throw new Error('NOT IMPLEMENTED YET');
        case 'hashpack':
          if (!hashConnectSaveData.topic) {
            throw new Error('Loading topic Error.');
          }
          if (!txBytes && tx instanceof Transaction) {
            txBytes = await SigningService.makeBytes(tx, userWalletId);
          }

          return await hashConnect?.sendTransaction(hashConnectSaveData.topic, {
            topic: hashConnectSaveData.topic,
            byteArray: txBytes,
            metadata: {
              accountToSign: userWalletId,
              returnTransaction: false,
            },
          });
        case 'noconnection':
          throw new Error('No wallet connected!');
      }
    },
    [hashConnect, connectedWalletType, userWalletId, hashConnectSaveData.topic]
  );

  return {
    userWalletId,
    connectedWalletType,
    connect,
    disconnect,
    sign,
    sendTransaction,
  };
};

export default useHederaWallets;
