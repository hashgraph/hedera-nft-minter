import { useCallback, useContext, useMemo } from 'react'
import { toast } from 'react-toastify';
import { HederaWalletsContext} from '@utils/context/HederaWalletsContext';
import { MessageTypes } from 'hashconnect';

const useHederaWallets = () => {
  const {
    bladeSigner,
    hashConnect,
    saveData,
    isBladeWalletConnected,
    initializeBladeWallet,
    connectBladeWallet,
    clearPairedAccountsAndHashPackWalletData,
    clearConnectedBladeWalletData,
    installedHashPackExtensions,
    connectedWalletType
  } = useContext(HederaWalletsContext);

  const isHashPackConnected = useMemo(() => !!saveData.hashConnectAccountIds?.length, [saveData]);

  const connectToHashPack = useCallback(() => {
    if(typeof saveData?.pairingString === 'undefined'){
      throw new Error('No pairing key generated! Initialize HashConnect first!')
    }

    if (!installedHashPackExtensions || !hashConnect){
      throw new Error('Hashpack wallet is not installed!');
    }

    hashConnect.connectToLocalWallet(saveData?.pairingString);
  },[installedHashPackExtensions, saveData, hashConnect]);


  const sign = useCallback((tx: MessageTypes.Transaction) => {
    if (!saveData.topic) {
      throw new Error('Connect wallet first.');
    }

    return hashConnect?.sendTransaction(saveData.topic, tx);
  }, [hashConnect, saveData]);

  const clearHashPackPairings = useCallback(() => {
    clearPairedAccountsAndHashPackWalletData()
    toast('❌ Removed HashPack pairings.')
  },[clearPairedAccountsAndHashPackWalletData])

  const clearBladeWalletPairing = useCallback(()=>{
    clearConnectedBladeWalletData()
    toast('❌ Removed Blade Wallet pairing.')
  },[clearConnectedBladeWalletData])


  return {
    connectedWalletType,
    isHashPackConnected,
    isBladeWalletConnected,
    hashConnect,
    bladeSigner,
    saveData,
    installedHashPackExtensions,
    connectToHashPack,
    clearHashPackPairings,
    sign,
    clearBladeWalletPairing,
    initializeBladeWallet,
    connectBladeWallet,
  }
}

export default useHederaWallets
