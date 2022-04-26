import {HashConnectTypes,HashConnect} from 'hashconnect'


export type AppConfigType = HashConnectTypes.WalletMetadata
export type InitialSaveDataType = {
  topic?: string;
  pairingString?: string;
  privateKey?: string;
  pairedWalletData?: HashConnectTypes.WalletMetadata | null;
  pairedAccounts?: string[];
}
export type DebugType = boolean;
export type NetworkType = string;
export type MetadataType = HashConnectTypes.WalletMetadata

export type SaveDataType = {
  topic?: string;
  pairingString?: string;
  privateKey?: string;
  pairedWalletData?: HashConnectTypes.WalletMetadata | null;
  pairedAccounts?: string[];
  accountIds?: string[];
  id?: string;
  network?: string;
}

export type HashConnectContextType = {
  hashConnect: HashConnect | null;
  saveData: SaveDataType;
  installedExtensions: HashConnectTypes.AppMetadata[];
  netWork: NetworkType;
  connect: () => undefined | void;
  clearPairings: () => void | undefined;
  initializeHashConnect: () => Promise<void> | undefined;
};
