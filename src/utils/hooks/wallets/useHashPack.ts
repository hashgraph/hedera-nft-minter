import { HEDERA_NETWORK } from '@/../Global.d';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import {
  SaveDataType,
  AppConfigType as HashConnectAppConfigType,
  DebugType as HashConnectDebugType,
  NetworkType as HashConnectNetworkType,
} from '@utils/types/hashconnect.types';
import { loadLocalData } from '@/utils/helpers/loadLocalData';

export const HASHCONNECT_LOCALSTORAGE_VARIABLE_NAME = 'minerPocHashconnectData';

export const HASHCONNECT_INITIAL_APP_CONFIG: HashConnectAppConfigType = {
  name: 'Hedera Minter Wizard',
  description: 'Mint your own NFT.',
  icon: 'https://svgpnglogo.com/wp-content/uploads/hedera-hashgraph-hbar-logo.png',
};
export const HASHCONNECT_INITIAL_DEBUG: HashConnectDebugType = true;

export const INITIAL_SAVE_DATA: SaveDataType = {
  topic: '',
  pairingString: '',
  privateKey: '',
  pairedWalletData: null,
  accountsIds: [],
};

export const HASHCONNECT_INITIAL_NETWORK: HashConnectNetworkType = HEDERA_NETWORK;

const hashConnect = new HashConnect(HASHCONNECT_INITIAL_DEBUG);

const useHashPack = () => {
  const [hashConnectSaveData, setHashConnectSaveData] =
    useState(INITIAL_SAVE_DATA);
  const [installedHashPackExtensions, setInstalledHashPackExtensions] =
    useState<HashConnectTypes.AppMetadata[]>([]);

  // CLEANER
  const clearPairedAccountsAndHashPackWalletData = useCallback(() => {
    setHashConnectSaveData((prev) => {
      prev.accountsIds = [];
      prev.pairedWalletData = undefined;
      return { ...prev };
    });
    localStorage.removeItem(HASHCONNECT_LOCALSTORAGE_VARIABLE_NAME);
  }, [setHashConnectSaveData]);

  //CONNECTION
  const connectToHashPack = useCallback(() => {
    try {
      if (typeof hashConnectSaveData?.pairingString === 'undefined') {
        throw new Error(
          'No pairing key generated! Initialize HashConnect first!'
        );
      }

      if (installedHashPackExtensions.length === 0 || !hashConnect) {
        throw new Error('Hashpack wallet is not installed!');
      }

      hashConnect.connectToLocalWallet(hashConnectSaveData?.pairingString);
    } catch (e) {
      if (typeof e === 'string') {
        toast.error(e);
      } else if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }, [installedHashPackExtensions, hashConnectSaveData]);

  //INITIALIZATION
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
        setHashConnectSaveData((prevData) => ({
          ...prevData,
          ...localData,
        }));
      } else {
        setHashConnectSaveData(newSaveData);
      }
    }
  }, [setHashConnectSaveData]);

  useEffect(() => {
    initializeHashConnect();
  }, [initializeHashConnect]);

  /* ---- EVENTS LISTENING ---- */
  const setSaveDataAndInLocalStorage = useCallback(
    (data) => {
      setHashConnectSaveData((prevSaveData) => {
        prevSaveData.accountsIds = data.accountIds;
        prevSaveData.pairedWalletData = data.metadata;
        return { ...prevSaveData };
      });
      localStorage.setItem(
        HASHCONNECT_LOCALSTORAGE_VARIABLE_NAME,
        JSON.stringify(hashConnectSaveData)
      );
    },
    [setHashConnectSaveData, hashConnectSaveData]
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
      toast.success('➕ New HashPack account(s) paired!');
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

  return {
    hashConnect,
    hashConnectSaveData,
    connectToHashPack,
    clearPairedAccountsAndHashPackWalletData,
  };
};

export default useHashPack;
