import React, { useCallback } from 'react';
import useHashConnectConnection from '@hooks/useHashconnectConnection';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import {
  networkType,
  saveDataType,
} from '../consts/hashconnect-connection-consts-types';
import {
  INITIAL_SAVE_DATA,
  NETWORK,
} from '../consts/hashconnect-connection-consts';

export type HashConnectContextType = {
  hashConnect: HashConnect | null;
  saveData: saveDataType;
  installedExtensions: HashConnectTypes.AppMetadata[];
  netWork: networkType;
  connectToHashpack: () => undefined | void;
  clearHashpackPairings: () => void | undefined;
  initializeHashConnect: () => Promise<void> | undefined;
};

export const HashConnectContext = React.createContext<HashConnectContextType>({
  hashConnect: null,
  saveData: INITIAL_SAVE_DATA,
  installedExtensions: [],
  netWork: NETWORK,
  connectToHashpack: () => undefined,
  clearHashpackPairings: () => undefined,
  initializeHashConnect: () => undefined,
});

export default function HashConnectProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const {
    hashConnect,
    saveData,
    installedExtensions,
    netWork,
    connect,
    clearPairings,
    initializeHashConnect,
  } = useHashConnectConnection();

  const connectToHashpack = useCallback(() => {
    try {
      connect();
    } catch (e) {
      if (typeof e === 'string') {
        throw new Error(e);
      } else if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }, [connect]);
  const clearHashpackPairings = useCallback(() => {
    try {
      clearPairings();
    } catch (e) {
      if (typeof e === 'string') {
        throw new Error(e);
      } else if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }, [clearPairings]);

  return (
    <HashConnectContext.Provider
      value={{
        hashConnect,
        saveData,
        installedExtensions,
        netWork,
        connectToHashpack,
        clearHashpackPairings,
        initializeHashConnect,
      }}
    >
      {children}
    </HashConnectContext.Provider>
  );
}
