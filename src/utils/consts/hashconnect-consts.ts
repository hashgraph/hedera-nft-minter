import {
  AppConfigType,
  DebugType,
  InitialSaveDataType,
  NetworkType,
  HashConnectContextType
 } from '@utils/consts/hashconnect-consts-types';

export const LOCALSTORAGE_VARIABLE_NAME = 'minerPocHashconnectData'

export const INITIAL_APP_CONFIG : AppConfigType = {
  name: 'React dApp Example',
  description: 'An example hedera dApp',
  icon: 'https://d2441bdvuxbh7t.cloudfront.net/web/images/grepper_and_logo.jpeg',
};

export const INITIAL_SAVE_DATA : InitialSaveDataType = {
  topic: '',
  pairingString: '',
  privateKey: '',
  accountIds: [],
  pairedWalletData: null,
};

export const INITIAL_DEBUG : DebugType = true

export const INITIAL_NETWORK : NetworkType = 'testnet'

export const INITIAL_HASHCONNECT_CONTEXT : HashConnectContextType  =  {
  hashConnect: null,
  saveData: INITIAL_SAVE_DATA,
  installedExtensions: [],
  setSaveData: () => undefined
}
