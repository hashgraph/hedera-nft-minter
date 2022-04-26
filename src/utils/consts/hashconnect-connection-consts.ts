import {
  AppConfigType,
  DebugType,
  InitialSaveDataType,
  MetadataType,
  NetworkType,
  HashConnectContextType
 } from './hashconnect-connection-consts-types';


export const APP_CONFIG : AppConfigType = {
  name: 'React dApp Example',
  description: 'An example hedera dApp',
  icon: 'https://d2441bdvuxbh7t.cloudfront.net/web/images/grepper_and_logo.jpeg',
};

export const INITIAL_SAVE_DATA : InitialSaveDataType = {
  topic: '',
  pairingString: '',
  privateKey: '',
  pairedAccounts: [],
  pairedWalletData: null,
};

export const DEBUG : DebugType = true

export const NETWORK : NetworkType = 'testnet'

export const METADATA : MetadataType = {
  name: APP_CONFIG.name,
  description: APP_CONFIG.description,
  icon: APP_CONFIG.icon,
}

export const INITIAL_HASHCONNECT_CONTEXT : HashConnectContextType  =  {
  hashConnect: null,
  saveData: INITIAL_SAVE_DATA,
  installedExtensions: [],
  netWork: NETWORK,
  connect: () => undefined,
  clearPairings: () => undefined,
  initializeHashConnect: () => undefined,
}
