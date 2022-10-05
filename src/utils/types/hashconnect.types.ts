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

import { HashConnectTypes, HashConnect } from 'hashconnect'

export type AppConfigType = HashConnectTypes.WalletMetadata
export type InitialSaveDataType = {
  topic?: string;
  pairingString?: string;
  privateKey?: string;
  accountIds?: string[];
  pairedWalletData?: HashConnectTypes.WalletMetadata | HashConnectTypes.AppMetadata | null;
}
export type DebugType = boolean;
export type NetworkType = string;
export type MetadataType = HashConnectTypes.WalletMetadata

export type SaveDataType = {
  topic?: string;
  pairingString?: string;
  privateKey?: string;
  pairedWalletData?: HashConnectTypes.WalletMetadata | HashConnectTypes.AppMetadata | null;
  accountsIds: string[];
  id?: string;
  network?: string;
}

export type HashConnectContextType = {
  hashConnect: HashConnect | null;
  installedExtensions: HashConnectTypes.AppMetadata[];
  saveData: SaveDataType;
  clearPairedAccountsAndWalletData: ()=>void;
};
