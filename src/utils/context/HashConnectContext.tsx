import React, { useState } from 'react';
import Hashconnect from '@/services/Hashconnect';
import { INITIAL_HASHCONNECT_CONTEXT } from '../consts/hashconnect-connection-consts';
import { HashConnectContextType } from '../consts/hashconnect-connection-consts-types';

export const HashConnectContext = React.createContext<HashConnectContextType>(
  INITIAL_HASHCONNECT_CONTEXT
);

export default function HashConnectProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [hashConnect] = useState(new Hashconnect());
  // const hashConnect = new Hashconnect();

  return (
    <HashConnectContext.Provider
      value={{
        hashConnect,
      }}
    >
      {children}
    </HashConnectContext.Provider>
  );
}
