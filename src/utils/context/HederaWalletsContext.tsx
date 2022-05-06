import React, { useEffect, useState, useCallback } from 'react';
import { AccountId } from '@hashgraph/sdk';
import { toast } from 'react-toastify';
import { BladeSigner } from '@bladelabs/blade-web3.js';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import {
  SaveDataType,
  AppConfigType as HashConnectAppConfigType,
  DebugType as HashConnectDebugType,
  NetworkType as HashConnectNetworkType,
} from '@utils/types/hashconnect.types';

/** CONSTS */
//HASHCONNECT
export const HASHCONNECT_LOCALSTORAGE_VARIABLE_NAME = 'minerPocHashconnectData';

export const HASHCONNECT_INITIAL_APP_CONFIG: HashConnectAppConfigType = {
  name: 'React dApp Example',
  description: 'An example hedera dApp',
  icon: 'https://d2441bdvuxbh7t.cloudfront.net/web/images/grepper_and_logo.jpeg',
};

export const INITIAL_SAVE_DATA: SaveDataType = {
  topic: '',
  pairingString: '',
  privateKey: '',
  pairedWalletData: null,
  hashConnectAccountIds: [],
  bladeAccountId: undefined,
};

export const HASHCONNECT_INITIAL_DEBUG: HashConnectDebugType = true;

export const HASHCONNECT_INITIAL_NETWORK: HashConnectNetworkType = 'testnet';

//BLADE
export const BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME =
  'minerPocBladeWalletData';

type BladeWalletSaveDataType = {
  bladeAccountId?: AccountId | string;
};

export const BLADEWALLET_INITIAL_SAVEDATA: BladeWalletSaveDataType = {};
/** END OF CONSTS */

//CONTEXT

type HederaWalletsContextType = {
  bladeSigner?: BladeSigner;
  hashConnect?: HashConnect;
  saveData: SaveDataType;
  connectBladeWallet: () => void;
  connectToHashPack: () => void;
  clearConnectedBladeWalletData: () => void;
  clearPairedAccountsAndHashPackWalletData: () => void;
  connectedWalletType: 'bladewallet' | 'hashpack' | 'noconnection';
};

const INITIAL_CONTEXT: HederaWalletsContextType = {
  hashConnect: undefined,
  bladeSigner: undefined,
  saveData: INITIAL_SAVE_DATA,
  clearPairedAccountsAndHashPackWalletData: () => undefined,
  connectBladeWallet: () => undefined,
  connectToHashPack: () => undefined,
  clearConnectedBladeWalletData: () => undefined,
  connectedWalletType: 'noconnection',
};

export const HederaWalletsContext = React.createContext(INITIAL_CONTEXT);

//create BladeSigner instance
const bladeSigner = new BladeSigner();
//create HashConnect instance
const hashConnect = new HashConnect(HASHCONNECT_INITIAL_DEBUG);

export default function HederaWalletsProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [connectedWalletType, setConnectedWalletType] = useState<
    'bladewallet' | 'hashpack' | 'noconnection'
  >('noconnection');
  const [saveData, setSaveData] = useState(INITIAL_SAVE_DATA);
  const [installedHashPackExtensions, setInstalledHashPackExtensions] =
    useState<HashConnectTypes.AppMetadata[]>([]);

  /** ---- CLEANERS ---- */
  const clearPairedAccountsAndHashPackWalletData = useCallback(() => {
    setSaveData((prev) => {
      prev.hashConnectAccountIds = [];
      prev.pairedWalletData = undefined;
      return { ...prev };
    });
    localStorage.removeItem(HASHCONNECT_LOCALSTORAGE_VARIABLE_NAME);
  }, [setSaveData]);

  const clearConnectedBladeWalletData = useCallback(() => {
    localStorage.removeItem(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME);

    setSaveData((prev) => ({
      ...prev,
      bladeAccountId: undefined,
    }));
  }, [setSaveData]);

  /** ---- END OF CLEANERS ---- */
  /* ---- INITIALIZATION ---- */
  const loadLocalData = (variable: string) => {
    const foundData = localStorage.getItem(variable);
    if (foundData) return JSON.parse(foundData);
    return null;
  };
  //HASHCONNECT
  const initializeHashConnect = useCallback(async () => {
    const localData = loadLocalData(HASHCONNECT_LOCALSTORAGE_VARIABLE_NAME);
    const newSaveData = INITIAL_SAVE_DATA;
    try {
      if (!localData) {
        //first init and store the private for later
        const initData = await hashConnect.init(HASHCONNECT_INITIAL_APP_CONFIG);
        newSaveData.privateKey = initData.privKey;

        //then connect, storing the new topic for later
        const state = await hashConnect.connect();
        newSaveData.topic = state.topic;

        //generate a pairing string, which you can display and generate a QR code from
        newSaveData.pairingString = hashConnect.generatePairingString(
          state,
          HASHCONNECT_INITIAL_NETWORK ?? 'testnet',
          HASHCONNECT_INITIAL_DEBUG ?? false
        );
      } else {
        //use stored values to initialize and connect
        await hashConnect.init(
          HASHCONNECT_INITIAL_APP_CONFIG,
          localData.privateKey
        );
        await hashConnect.connect(localData.topic, localData.pairedWalletData);
        setConnectedWalletType('hashpack');
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

  const connectToHashPack = useCallback(() => {
    if (typeof saveData?.pairingString === 'undefined') {
      throw new Error(
        'No pairing key generated! Initialize HashConnect first!'
      );
    }

    if (!installedHashPackExtensions || !hashConnect) {
      throw new Error('Hashpack wallet is not installed!');
    }

    hashConnect.connectToLocalWallet(saveData?.pairingString);
  }, [installedHashPackExtensions, saveData]);

  //BLADE
  const connectBladeWallet = useCallback(async () => {
    let loggedId: AccountId | string = '';

    try {
      await bladeSigner.createSession();
      loggedId = bladeSigner.getAccountId();
    } catch (e) {
      if (typeof e === 'function') {
        const { message } = e();
        toast(message);
      } else if (typeof e === 'string') {
        toast(e);
      } else if (e instanceof Error) {
        toast(e.message);
      }
    } finally {
      if (!loggedId) {
        toast.error('Cannot find connected account id in Blade Wallet!');
      } else {
        if (!loadLocalData(BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME)) {
          toast('Blade Wallet has been connected!');
        }
        setSaveData((prev) => ({
          ...prev,
          bladeAccountId: loggedId && loggedId.toString(),
        }));
        localStorage.setItem(
          BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME,
          loggedId.toString()
        );
      }
      setConnectedWalletType('bladewallet');
      clearPairedAccountsAndHashPackWalletData();
    }
  }, [setSaveData, clearPairedAccountsAndHashPackWalletData]);

  const initializeBladeWallet = useCallback(async () => {
    const wasConnected = !!loadLocalData(
      BLADE_WALLET_LOCALSTORAGE_VARIABLE_NAME
    );
    if (wasConnected) {
      await connectBladeWallet();
    }
  }, [connectBladeWallet]);

  useEffect(() => {
    initializeBladeWallet();
    initializeHashConnect();
  }, [initializeBladeWallet, initializeHashConnect]);
  /* ---- END OF INITIALIZATION ---- */

  /* ---- EVENTS LISTENING ---- */
  const setSaveDataAndInLocalStorage = useCallback(
    (data) => {
      setSaveData((prevSaveData) => {
        prevSaveData.hashConnectAccountIds = data.accountIds;
        prevSaveData.pairedWalletData = data.metadata;
        return { ...prevSaveData };
      });
      localStorage.setItem(
        HASHCONNECT_LOCALSTORAGE_VARIABLE_NAME,
        JSON.stringify(saveData)
      );
    },
    [setSaveData, saveData]
  );

  const foundExtensionEventHandler = useCallback(
    (data) => {
      setInstalledHashPackExtensions((prevSaveData) => [
        { ...data },
        ...prevSaveData,
      ]);
    },
    [setInstalledHashPackExtensions]
  );

  const pairingEventHandler = useCallback(
    (data) => {
      setSaveDataAndInLocalStorage(data);
      toast('➕ New account(s) paired!');
      setConnectedWalletType('hashpack');
      clearConnectedBladeWalletData();
    },
    [setSaveDataAndInLocalStorage, clearConnectedBladeWalletData]
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

  useEffect(() => {
    if (
      saveData.bladeAccountId === undefined &&
      saveData.hashConnectAccountIds?.length === 0
    )
      setConnectedWalletType('noconnection');
  }, [saveData]);
  /** END EVENT LISTENING */

  return (
    <HederaWalletsContext.Provider
      value={{
        bladeSigner,
        hashConnect,
        saveData,
        connectBladeWallet,
        clearPairedAccountsAndHashPackWalletData,
        clearConnectedBladeWalletData,
        connectedWalletType,
        connectToHashPack,
      }}
    >
      {children}
    </HederaWalletsContext.Provider>
  );
}
