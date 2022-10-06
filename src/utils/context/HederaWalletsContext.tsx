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
import { BladeSigner } from '@bladelabs/blade-web3.js';
import { HashConnect } from 'hashconnect';
import { SaveDataType } from '@utils/types/hashconnect.types';
import useHashPack, {
  INITIAL_SAVE_DATA,
} from '@utils/hooks/wallets/useHashPack';
import useBladeWallet, {
  BladeAccountId,
} from '@utils/hooks/wallets/useBladeWallet';

interface HederaWalletsContextType {
  bladeSigner?: BladeSigner;
  hashConnect?: HashConnect;
  hashConnectSaveData: SaveDataType;
  bladeAccountId: BladeAccountId;
  connectBladeWallet: () => void;
  connectToHashPack: () => void;
  clearConnectedBladeWalletData: () => void;
  clearPairedAccountsAndHashPackWalletData: () => void;
}

const INITIAL_CONTEXT: HederaWalletsContextType = {
  hashConnect: undefined,
  bladeSigner: undefined,
  hashConnectSaveData: INITIAL_SAVE_DATA,
  bladeAccountId: '',
  clearPairedAccountsAndHashPackWalletData: () => undefined,
  connectBladeWallet: () => undefined,
  connectToHashPack: () => undefined,
  clearConnectedBladeWalletData: () => undefined,
};

export const HederaWalletsContext = React.createContext(INITIAL_CONTEXT);

export default function HederaWalletsProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const {
    bladeSigner,
    bladeAccountId,
    connectBladeWallet,
    clearConnectedBladeWalletData,
  } = useBladeWallet();

  const {
    hashConnect,
    hashConnectSaveData,
    connectToHashPack,
    clearPairedAccountsAndHashPackWalletData,
  } = useHashPack();

  return (
    <HederaWalletsContext.Provider
      value={{
        bladeSigner,
        hashConnect,
        hashConnectSaveData,
        bladeAccountId,
        connectBladeWallet,
        clearPairedAccountsAndHashPackWalletData,
        clearConnectedBladeWalletData,
        connectToHashPack,
      }}
    >
      {children}
    </HederaWalletsContext.Provider>
  );
}
