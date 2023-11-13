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

import React from 'react';
import useHashPack from '@utils/hooks/wallets/useHashPack';
import useBladeWallet from '@utils/hooks/wallets/useBladeWallet';

interface HederaWalletsContextType {
  hashPack: ReturnType<typeof useHashPack>;
  bladeWallet: ReturnType<typeof useBladeWallet>;
}

const INITIAL_CONTEXT: HederaWalletsContextType = {
  hashPack: {
    hashConnectState: {},
    isIframeParent: false,
    connectToHashPack: () => undefined,
    disconnectFromHashPack: () => Promise.resolve(),
    sendTransactionWithHashPack: () => Promise.reject(),
  },
  bladeWallet: {
    activeBladeWalletAccountId: undefined,
    disconnectFromBladeWallet: () => Promise.resolve(),
    createBladeWalletSession: () => Promise.resolve(),
    sendTransactionWithBladeWallet: () => Promise.resolve(null),
  },
};

export const HederaWalletsContext = React.createContext(INITIAL_CONTEXT);

export default function HederaWalletsProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const bladeWallet = useBladeWallet();
  const hashPack = useHashPack();

  return (
    <HederaWalletsContext.Provider
      value={{ hashPack, bladeWallet }}
    >
      {children}
    </HederaWalletsContext.Provider>
  );
}
