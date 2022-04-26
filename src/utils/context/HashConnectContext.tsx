import React from 'react';
import useHashConnectConnection from '@hooks/useHashconnectConnection';
import { HashConnectContextType } from '../consts/hashconnect-connection-consts-types';
import { INITIAL_HASHCONNECT_CONTEXT } from '../consts/hashconnect-connection-consts';

export const HashConnectContext = React.createContext<HashConnectContextType>(
  INITIAL_HASHCONNECT_CONTEXT
);

export default function HashConnectProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const connectionApi = useHashConnectConnection();

  return (
    <HashConnectContext.Provider
      value={{
        ...connectionApi,
      }}
    >
      {children}
    </HashConnectContext.Provider>
  );
}
