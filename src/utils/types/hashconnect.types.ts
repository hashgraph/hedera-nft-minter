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
  accountIds?: string[];
  id?: string;
  network?: string;
}

export type HashConnectContextType = {
  hashConnect: HashConnect | null;
  installedExtensions: HashConnectTypes.AppMetadata[];
  saveData: SaveDataType;
  clearPairedAccountsAndWalletData: ()=>void;
};
