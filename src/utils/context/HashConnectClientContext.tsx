import React from 'react';
import { HashConnect } from 'hashconnect';

const hashconnect = new HashConnect(true);
export const HashConnectClientContext =
  React.createContext<HashConnect>(hashconnect);

export default function HashConnectClientProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <HashConnectClientContext.Provider value={hashconnect}>
      {children}
    </HashConnectClientContext.Provider>
  );
}
