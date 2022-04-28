import React, { useEffect, useState, useCallback } from 'react';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import { toast } from 'react-toastify';
import {
  SaveDataType,
  AppConfigType,
  DebugType,
  InitialSaveDataType,
  NetworkType,
  HashConnectContextType,
} from '@utils/types/hashconnect.types';

/** CONSTS */
export const LOCALSTORAGE_VARIABLE_NAME = 'minerPocHashconnectData';

export const INITIAL_APP_CONFIG: AppConfigType = {
  name: 'React dApp Example',
  description: 'An example hedera dApp',
  icon: 'https://d2441bdvuxbh7t.cloudfront.net/web/images/grepper_and_logo.jpeg',
};

export const INITIAL_SAVE_DATA: InitialSaveDataType = {
  topic: '',
  pairingString: '',
  privateKey: '',
  accountIds: [],
  pairedWalletData: null,
};

export const INITIAL_DEBUG: DebugType = true;

export const INITIAL_NETWORK: NetworkType = 'testnet';

export const INITIAL_HASHCONNECT_CONTEXT: HashConnectContextType = {
  hashConnect: null,
  saveData: INITIAL_SAVE_DATA,
  installedExtensions: [],
  clearPairedAccountsAndWalletData: () => undefined,
};
/** END OF CONSTS */

//create HashConnect instance
const hashConnect = new HashConnect(true);
export const HashConnectContext = React.createContext<HashConnectContextType>(
  INITIAL_HASHCONNECT_CONTEXT
);

export default function HashConnectProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [saveData, setSaveData] = useState<SaveDataType>(INITIAL_SAVE_DATA);
  const [installedExtensions, setInstalledExtensions] = useState<
    HashConnectTypes.AppMetadata[]
  >([]);

  /* ---- INITIALIZATION ---- */
  const initializeHashConnect = useCallback(async () => {
    const loadLocalData = () => {
      const foundData = localStorage.getItem(LOCALSTORAGE_VARIABLE_NAME);
      if (foundData) return JSON.parse(foundData);
      return null;
    };
    const localData = loadLocalData();
    const newSaveData = INITIAL_SAVE_DATA;
    try {
      if (!localData) {
        //first init and store the private for later
        const initData = await hashConnect.init(INITIAL_APP_CONFIG);
        newSaveData.privateKey = initData.privKey;

        //then connect, storing the new topic for later
        const state = await hashConnect.connect();
        newSaveData.topic = state.topic;

        //generate a pairing string, which you can display and generate a QR code from
        newSaveData.pairingString = hashConnect.generatePairingString(
          state,
          INITIAL_NETWORK ?? 'testnet',
          INITIAL_DEBUG ?? false
        );
      } else {
        //use stored values to initialize and connect
        await hashConnect.init(INITIAL_APP_CONFIG, localData.privateKey);
        await hashConnect.connect(localData.topic, localData.pairedWalletData);
      }
      //find any supported local wallets
      hashConnect.findLocalWallets();
    } catch (e) {
      if (typeof e === 'string') {
        throw new Error(e);
      } else if (e instanceof Error) {
        throw new Error(e.message);
      }
    } finally {
      if (localData) {
        setSaveData((prevData) => ({
          ...prevData,
          ...localData,
        }));
      } else {
        setSaveData(newSaveData);
      }
    }
  }, [setSaveData]);

  useEffect(() => {
    initializeHashConnect();
  }, [initializeHashConnect]);
  /* ---- END OF INITIALIZATION ---- */

  /* ---- EVENTS LISTENING ---- */
  const setSaveDataAndInLocalStorage = useCallback(
    (data) => {
      setSaveData((prevSaveData) => {
        prevSaveData.accountIds = data.accountIds;
        prevSaveData.pairedWalletData = data.metadata;
        return { ...prevSaveData };
      });
      localStorage.setItem(
        LOCALSTORAGE_VARIABLE_NAME,
        JSON.stringify(saveData)
      );
    },
    [setSaveData, saveData]
  );

  const foundExtensionEventHandler = useCallback(
    (data) => {
      setInstalledExtensions((prevSaveData) => [{ ...data }, ...prevSaveData]);
    },
    [setInstalledExtensions]
  );

  const pairingEventHandler = useCallback(
    (data) => {
      setSaveDataAndInLocalStorage(data);
      toast('➕ New account(s) paired!');
    },
    [setSaveDataAndInLocalStorage]
  );

  const mount = useCallback(() => {
    if (hashConnect) {
      hashConnect.foundExtensionEvent.on(foundExtensionEventHandler);
      hashConnect.pairingEvent.on(pairingEventHandler);
    }
  }, [foundExtensionEventHandler, pairingEventHandler]);

  const unMount = useCallback(() => {
    if (hashConnect) {
      hashConnect.foundExtensionEvent.off(foundExtensionEventHandler);
      hashConnect.pairingEvent.off(pairingEventHandler);
    }
  }, [foundExtensionEventHandler, pairingEventHandler]);

  useEffect(() => {
    mount();
    return unMount;
  }, [mount, unMount]);
  /** END EVENT LISTENING */

  const clearPairedAccountsAndWalletData = useCallback(() => {
    setSaveData((prev) => {
      prev.accountIds = [];
      prev.pairedWalletData = undefined;
      return { ...prev };
    });
  }, [setSaveData]);

  return (
    <HashConnectContext.Provider
      value={{
        hashConnect,
        installedExtensions,
        saveData,
        clearPairedAccountsAndWalletData,
      }}
    >
      {children}
    </HashConnectContext.Provider>
  );
}
