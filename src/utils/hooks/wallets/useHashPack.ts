/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {
  APP_NAME,
  HEDERA_NETWORK,
  HASHPACK_APP_CONFIG_NAME,
  HASHPACK_APP_CONFIG_DESCRIPTION,
  HASHPACK_APP_CONFIG_ICON_URL
} from '@src/../Global.d';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import {
  SaveDataType,
  AppConfigType as HashConnectAppConfigType,
  DebugType as HashConnectDebugType,
  NetworkType as HashConnectNetworkType,
} from '@utils/types/hashconnect.types';
import { loadLocalData } from '@utils/helpers/loadLocalData';

export const HASHCONNECT_LOCALSTORAGE_VARIABLE_NAME = `${ APP_NAME ?? 'mintbar' }HashconnectData`;

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
    useState<SaveDataType>(INITIAL_SAVE_DATA);
  const [installedHashPackExtensions, setInstalledHashPackExtensions] =
    useState<HashConnectTypes.AppMetadata[]>([]);

  const hederaNetworkPrefix = useMemo(() => (
    HEDERA_NETWORK === 'testnet' ? `${ HEDERA_NETWORK }.` : ''
  ), [])

  // PREPARE APP CONFIG
  const appConfig = useMemo<HashConnectAppConfigType>(() => ({
    name: `${ hederaNetworkPrefix }${ HASHPACK_APP_CONFIG_NAME }`,
    description: HASHPACK_APP_CONFIG_DESCRIPTION,
    icon: HASHPACK_APP_CONFIG_ICON_URL ?? `${ window.location.protocol }//${ window.location.host }/logo.svg`
  }), [hederaNetworkPrefix])

  // CLEANER
  const clearPairedAccountsAndHashPackWalletData = useCallback(() => {
    setHashConnectSaveData((prev: SaveDataType) => {
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

      hashConnect.connectToLocalWallet();
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
        console.log({appConfig, HEDERA_NETWORK})
        const initData = await hashConnect.init(appConfig, HEDERA_NETWORK, true);
        console.log({initData})

        newSaveData.privateKey = initData.encryptionKey;

        //then connect, storing the new topic for later
        const state = await hashConnect.connect();
        console.log({state})

        newSaveData.topic = state;

        //generate a pairing string, which you can display and generate a QR code from
        newSaveData.pairingString = hashConnect.generatePairingString(
          state,
          HASHCONNECT_INITIAL_NETWORK ?? 'testnet',
          HASHCONNECT_INITIAL_DEBUG ?? false
        );
      } else {
        //use stored values to initialize and connect
        await hashConnect.init(
          appConfig,
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
        if (localData.pairedWalletData !== appConfig) {
          localData.pairedWalletData = appConfig
        }

        setHashConnectSaveData((prevData: SaveDataType) => ({
          ...prevData,
          ...localData
        }));
      } else {
        setHashConnectSaveData(newSaveData);
      }
    }
  }, [setHashConnectSaveData, appConfig]);

  useEffect(() => {
    initializeHashConnect();
  }, [initializeHashConnect]);

  /* ---- EVENTS LISTENING ---- */
  const setSaveDataAndInLocalStorage = useCallback(
    (data) => {
      setHashConnectSaveData((prevSaveData: SaveDataType) => {
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
      hashConnect.foundIframeEvent.on(pairingEventHandler)
    }
  }, [foundExtensionEventHandler, pairingEventHandler]);

  const unMount = useCallback(() => {
    if (hashConnect) {
      hashConnect.foundExtensionEvent.off(foundExtensionEventHandler);
      hashConnect.pairingEvent.off(pairingEventHandler);
      hashConnect.foundIframeEvent.off(pairingEventHandler);
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
