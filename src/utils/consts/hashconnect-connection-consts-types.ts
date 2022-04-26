import {HashConnectTypes} from 'hashconnect'


type appConfigType = HashConnectTypes.WalletMetadata
type initialSaveDataType = {
  topic?: string;
  pairingString?: string;
  privateKey?: string;
  pairedWalletData?: HashConnectTypes.WalletMetadata | null;
  pairedAccounts?: string[];
}
type debugType = boolean;
type networkType = string;
type metadataType = HashConnectTypes.WalletMetadata

type saveDataType = {
  topic?: string;
  pairingString?: string;
  privateKey?: string;
  pairedWalletData?: HashConnectTypes.WalletMetadata | null;
  pairedAccounts?: string[];
  accountIds?: string[];
  id?: string;
  network?: string;
}

export type {
  appConfigType,
  initialSaveDataType,
  debugType,
  networkType,
  metadataType,
  saveDataType
}
