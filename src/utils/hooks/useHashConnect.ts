import React, { useCallback, useContext } from 'react'
import { toast } from 'react-toastify';
import { LOCALSTORAGE_VARIABLE_NAME } from '@utils/consts/hashconnect-consts'
import { HashConnectContextType } from '@utils/consts/hashconnect-consts-types'
import { HashConnectContext } from '@utils/context/HashConnectContext';

const useHashConnect = (context : React.Context<HashConnectContextType> = HashConnectContext) => {
  const {
    installedExtensions,
    hashConnect,
    saveData,
    setSaveData
  } = useContext<HashConnectContextType>(context);

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
    setSaveData((prev)=>{
      prev.accountIds = [];
      prev.pairedWalletData = undefined;
      return {...prev}
    })

    localStorage.removeItem(LOCALSTORAGE_VARIABLE_NAME);
    toast('❌ Removed pairings.')
  },[setSaveData])

  return{
    hashConnect,
    saveData,
    installedExtensions,
    connect,
    clearPairings,
  }
}

export default useHashConnect
