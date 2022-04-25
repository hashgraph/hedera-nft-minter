import React, { useCallback, useState } from 'react';
import HashConnect from '@/services/HashConnect';

interface HashConnectContextType {
  connected: boolean;
  initHashconnect: () => Promise<void>
}

export const HashConnectContext = React.createContext<HashConnectContextType>({
  connected: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initHashconnect: async () => {},
});

export default function HashConnectProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [connected, setConnected] = useState(false);

  const initHashconnect = useCallback(async () => {
    try {
      const connection = new HashConnect();
      await connection.init();
      setConnected(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log({ e });
    }
  }, []);

  return (
    <HashConnectContext.Provider
      value={{
        connected,
        initHashconnect,
      }}
    >
      {children}
    </HashConnectContext.Provider>
  );
}
