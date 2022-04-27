import {HashConnectTypes} from 'hashconnect'
import Hashconnect from '@/services/Hashconnect';

export type AppConfigType = HashConnectTypes.WalletMetadata
export type InitialSaveDataType = {
  topic?: string;
  pairingString?: string;
  privateKey?: string;
  pairedWalletData?: HashConnectTypes.WalletMetadata;
  pairedAccounts?: string[];
}
export type DebugType = boolean;
export type NetworkType = string;
export type MetadataType = HashConnectTypes.WalletMetadata

export type SaveDataType = {
  topic?: string;
  pairingString?: string;
  privateKey?: string;
  pairedWalletData?: HashConnectTypes.WalletMetadata ;
  pairedAccounts?: string[];
  accountIds?: string[];
  id?: string;
  INITIAL_NETWORK?: string;
}

export type HashConnectContextType = {
  hashConnect?: Hashconnect;
};
