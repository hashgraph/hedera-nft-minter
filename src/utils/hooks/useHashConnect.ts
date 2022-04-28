import { useCallback, useContext, useMemo } from 'react'
import { toast } from 'react-toastify';
import { HashConnectContextType } from '@utils/types/hashconnect.types'
import { HashConnectContext, LOCALSTORAGE_VARIABLE_NAME } from '@utils/context/HashConnectContext';
import { MessageTypes } from 'hashconnect';

const useHashConnect = () => {
  const {
    installedExtensions,
    hashConnect,
    saveData,
    clearPairedAccountsAndWalletData
  } = useContext<HashConnectContextType>(HashConnectContext);

  const connected = useMemo(() => !!saveData.accountIds?.length, [saveData]);

  const connect = useCallback(() => {
    if(typeof saveData?.pairingString === 'undefined'){
      throw new Error('No pairing key generated! Initialize HashConnect first!')
    }

    if (!installedExtensions || !hashConnect){
      throw new Error('Hashpack wallet is not installed!');
    }

    hashConnect.connectToLocalWallet(saveData?.pairingString);
  },[installedExtensions, saveData, hashConnect]);

  const clearPairings = useCallback(() => {
    clearPairedAccountsAndWalletData()
    localStorage.removeItem(LOCALSTORAGE_VARIABLE_NAME);
    toast('❌ Removed pairings.')
  },[clearPairedAccountsAndWalletData])

  const sign = useCallback((tx: MessageTypes.Transaction) => {
    if (!saveData.topic) {
      throw new Error('Connect wallet first.');
    }

    return hashConnect?.sendTransaction(saveData.topic, tx);
  }, [hashConnect, saveData]);

  return {
    connected,
    hashConnect,
    saveData,
    installedExtensions,
    connect,
    clearPairings,
    sign,
  }
}

export default useHashConnect
