import React, { useCallback, useContext } from 'react'
import { LOCALSTORAGE_VARIABLE_NAME } from '@utils/consts/hashconnect-consts'
import { HashConnectContextType } from '@utils/consts/hashconnect-consts-types'
import { toast } from 'react-toastify';

const useHashConnect = (context : React.Context<HashConnectContextType>) => {
  const ctx = useContext<HashConnectContextType>(context);
  const {
    installedExtensions,
    hashConnect,
    initializeHashConnect,
    saveData,
    setSaveData
  } = ctx

  if(!ctx && typeof hashConnect === 'undefined') throw new Error('You don\'t provided context with HashConnect provider!');

  const connect = useCallback(() => {
    if(typeof saveData?.pairingString === 'undefined')
      throw new Error('No pairing key generated! Initialize HashConnect first!')
    if (!installedExtensions || !hashConnect)
      throw new Error('Hashpack wallet is not installed!');
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

    initializeHashConnect,
    connect,
    clearPairings,
  }


}

export default useHashConnect
