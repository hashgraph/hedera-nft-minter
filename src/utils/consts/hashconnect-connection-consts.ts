import { appConfigType, debugType, initialSaveDataType, metadataType, networkType } from './hashconnect-connection-consts-types';

export const APP_CONFIG : appConfigType = {
  name: 'React dApp Example',
  description: 'An example hedera dApp',
  icon: 'https://d2441bdvuxbh7t.cloudfront.net/web/images/grepper_and_logo.jpeg',
};

export const INITIAL_SAVE_DATA : initialSaveDataType = {
  topic: '',
  pairingString: '',
  privateKey: '',
  pairedAccounts: [],
  pairedWalletData: null,
};

export const DEBUG : debugType = true
export const NETWORK : networkType = 'testnet'
export const METADATA : metadataType = {
  name: APP_CONFIG.name,
  description: APP_CONFIG.description,
  icon: APP_CONFIG.icon,
}
