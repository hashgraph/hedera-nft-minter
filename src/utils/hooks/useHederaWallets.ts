import { useCallback, useContext, useMemo } from 'react'
import { toast } from 'react-toastify';
import { HederaWalletsContext} from '@utils/context/HederaWalletsContext';
import { MessageTypes } from 'hashconnect';
import { SigningService } from '@/services/SigningService';


const useHederaWallets = () => {
  const {
    // bladeSigner,
    hashConnect,
    connectedWalletType,
    saveData,
    connectBladeWallet,
    connectToHashPack,
    clearPairedAccountsAndHashPackWalletData,
    clearConnectedBladeWalletData,
  } = useContext(HederaWalletsContext);

  const sign = useCallback((tx: MessageTypes.Transaction) => {
    if (!saveData.topic) {
      throw new Error('Connect wallet first.');
    }

    return hashConnect?.sendTransaction(saveData.topic, tx);
  }, [hashConnect, saveData]);

  const connect = useCallback((walletType) => {
    switch (walletType) {
      case 'bladewallet':
        connectBladeWallet();
        break;
      case 'hashpack':
        connectToHashPack()
        break;
    }
  }, [
    connectBladeWallet,
    connectToHashPack,
  ]);

  const disconnect = useCallback(() => {
    switch (connectedWalletType) {
      case 'bladewallet':
        clearConnectedBladeWalletData();
        toast('❌ Removed Blade Wallet pairing.')
        break;
      case 'hashpack':
        clearPairedAccountsAndHashPackWalletData();
        toast('❌ Removed HashPack pairings.')
        break;
      default:
        clearConnectedBladeWalletData();
        clearPairedAccountsAndHashPackWalletData();
        toast('❌ Removed pairings.')
      break;
    }
  }, [
    connectedWalletType,
    clearConnectedBladeWalletData,
    clearPairedAccountsAndHashPackWalletData,
  ]);


  const userWalletId = useMemo(()=>{
    switch(connectedWalletType){
      case 'bladewallet':
        return saveData.bladeAccountId
        case 'hashpack':
          return saveData?.hashConnectAccountIds[0]
        case 'noconnection':
          return undefined
      }
  },[connectedWalletType,saveData.bladeAccountId, saveData.hashConnectAccountIds])


  const sendTransaction = useCallback(async(tx, txBytes = undefined)=>{
    if (!userWalletId) {
      throw new Error('Loading logged Hedera account id Error.');
    }
    switch(connectedWalletType){
      case 'bladewallet':
        throw new Error('NOT IMPLEMENTED YET')
      case 'hashpack':
        if (!saveData.topic) {
          throw new Error('Loading topic Error.');
        }
        if(!txBytes){
          txBytes = await SigningService.makeBytes(tx, userWalletId);
        }

        return await hashConnect?.sendTransaction(saveData.topic, {
          topic: saveData.topic,
          byteArray: txBytes,
          metadata: {
            accountToSign: userWalletId,
            returnTransaction: false,
          },
        });
      case 'noconnection':
        throw new Error('No wallet connected!')
    }
  },[hashConnect, connectedWalletType, userWalletId, saveData.topic])


  return {
    userWalletId,
    connectedWalletType,
    connect,
    disconnect,
    sign,
    sendTransaction,
  }
}

export default useHederaWallets
