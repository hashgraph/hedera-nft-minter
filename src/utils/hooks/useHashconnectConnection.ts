import { useEffect, useState, useContext, useCallback } from 'react';
import { HashConnectClientContext } from '../context/HashConnectClientContext'
import { APP_CONFIG, INITIAL_SAVE_DATA, DEBUG, NETWORK, METADATA } from '../consts/hashconnect-connection-consts'
import { saveDataType} from '../consts/hashconnect-connection-consts-types'
import {HashConnectTypes} from 'hashconnect'

const loadLocalData = () => {
  const foundData = localStorage.getItem('minerPocHashconnectData');
  if (foundData) {
    const saveData = JSON.parse(foundData);
    return saveData;
  } else return null;
};

const useHashConnectConnection = () => {
  const hashConnect = useContext(HashConnectClientContext)

  const [saveData, setSaveData] = useState<saveDataType>(INITIAL_SAVE_DATA);
  const [installedExtensions, setInstalledExtensions] =
    useState<HashConnectTypes.AppMetadata[]>([]);

  const initializeHashConnect = useCallback(async () => {
    const saveData = INITIAL_SAVE_DATA;
    const localData = loadLocalData();
    try {
      if (!localData) {
        //first init and store the private for later
        const initData = await hashConnect.init(METADATA ?? APP_CONFIG);
        saveData.privateKey = initData.privKey;

        //then connect, storing the new topic for later
        const state = await hashConnect.connect();
        saveData.topic = state.topic;

        //generate a pairing string, which you can display and generate a QR code from
        saveData.pairingString = hashConnect.generatePairingString(
          state,
          NETWORK ?? 'testnet',
          DEBUG ?? false
        );

        //find any supported local wallets
        await hashConnect.findLocalWallets();
      } else {
        //use loaded data for initialization + connection
        await hashConnect.findLocalWallets();
      }}
      catch(e){
        if (typeof e === 'string') {
            throw new Error(e)
        } else if (e instanceof Error) {
            throw new Error(e.message)
        }
    } finally {
      if (localData) {
        setSaveData((prevData) => ({ ...prevData, ...localData }));
      } else {
        setSaveData((prevData) => ({ ...prevData, ...saveData }));
      }
    }
  },[setSaveData, hashConnect]);

  const connect = () => {
    if (installedExtensions) {
      if(typeof saveData?.pairingString !== 'undefined'){
        hashConnect.connectToLocalWallet(saveData?.pairingString);
      }
      else{
        throw new Error('No pairing key generated! Initialize HashConnect first!')
      }
      return
    } else {
      throw new Error('Hashpack wallet is not installed!');
    }
  };

  const clearPairings = () => {
    setSaveData({})
    localStorage.removeItem('minerPocHashconnectData');
  }

  const saveDataInLocalStorage = useCallback((data) => {
    const { metadata, ...restData } = data;
    const temp = saveData;
    temp.pairedAccounts = metadata;
    setSaveData((prevSaveData) => {
      prevSaveData.pairedWalletData = metadata;
      return { ...prevSaveData, ...restData };
    });
    const dataToSave = JSON.stringify({ ...data, ...saveData });
    localStorage.setItem('minerPocHashconnectData', dataToSave);
  },[setSaveData, saveData]);

  const foundExtensionEventHandler = useCallback((data) => {
    const newData = [];
    newData.push(data)
    setInstalledExtensions(newData);
  },[setInstalledExtensions]);

  const pairingEventHandler = useCallback((data) => {
    saveDataInLocalStorage(data);
  },[saveDataInLocalStorage]);

  const mount = useCallback(()=>{
    hashConnect.foundExtensionEvent.on(foundExtensionEventHandler);
    hashConnect.pairingEvent.on(pairingEventHandler);
  },[hashConnect, foundExtensionEventHandler, pairingEventHandler])

  const unMount = useCallback(()=>{
      hashConnect.foundExtensionEvent.off(foundExtensionEventHandler);
      hashConnect.pairingEvent.off(pairingEventHandler);
  },[hashConnect, foundExtensionEventHandler, pairingEventHandler])

  useEffect(() => {
    initializeHashConnect();
  }, [initializeHashConnect]);

  useEffect(()=>{
    mount()
    return unMount
  },[mount,unMount])

  return { hashConnect, saveData, installedExtensions, netWork: NETWORK, connect, clearPairings, initializeHashConnect }

}

export default useHashConnectConnection
