import {
  AppConfigType,
  DebugType,
  InitialSaveDataType,
  MetadataType,
  NetworkType,
  HashConnectContextType
 } from './hashconnect-connection-consts-types';


export const INITIAL_APP_CONFIG : AppConfigType = {
  name: 'React dApp Example',
  description: 'An example hedera dApp',
  icon: 'https://d2441bdvuxbh7t.cloudfront.net/web/images/grepper_and_logo.jpeg',
};

export const INITIAL_SAVE_DATA : InitialSaveDataType = {
  topic: '',
  pairingString: '',
  privateKey: '',
  pairedAccounts: [],
  pairedWalletData: undefined,
};

export const INITIAL_DEBUG_BODE : DebugType = true

export const INITIAL_NETWORK : NetworkType = 'testnet'

export const INITIAL_METADATA : MetadataType = {
  name: INITIAL_APP_CONFIG.name,
  description: INITIAL_APP_CONFIG.description,
  icon: INITIAL_APP_CONFIG.icon,
}

export const INITIAL_HASHCONNECT_CONTEXT : HashConnectContextType  =  {
  hashConnect: undefined,
}

export const LOCALSTORAGE_VARIABLE_NAME  = 'minerPocHashconnectData'
