import {
  INITIAL_APP_CONFIG,
  INITIAL_SAVE_DATA,
  INITIAL_DEBUG_BODE,
  INITIAL_NETWORK,
  INITIAL_METADATA,
  LOCALSTORAGE_VARIABLE_NAME,
} from '../utils/consts/hashconnect-connection-consts';
import {
  AppConfigType,
  DebugType,
  MetadataType,
  NetworkType,
  SaveDataType,
} from '../utils/consts/hashconnect-connection-consts-types';
import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';
import LocalStorage from './LocalStorage';

interface IHashconnect {
  readonly appConfig: AppConfigType;
  readonly debug: DebugType;
  readonly netWork: NetworkType;
  metaData: MetadataType;
  hashConnect: HashConnect;
  saveData: SaveDataType;
  installedExtensions: HashConnectTypes.AppMetadata[];
  localStorage: LocalStorage;
}

export default class Hashconnect implements IHashconnect {
  readonly appConfig;
  readonly debug;
  readonly netWork;
  metaData;
  hashConnect;
  saveData;
  installedExtensions;
  localStorage;

  constructor() {
    this.appConfig = INITIAL_APP_CONFIG;
    this.debug = INITIAL_DEBUG_BODE;
    this.netWork = INITIAL_NETWORK;
    this.localStorage = new LocalStorage(LOCALSTORAGE_VARIABLE_NAME);
    this.hashConnect = new HashConnect(this.debug);
    this.saveData = INITIAL_SAVE_DATA;
    this.installedExtensions = <HashConnectTypes.AppMetadata[]>[];
    this.metaData = INITIAL_METADATA;
  }

  loadLocalDataToSavedData() {
    // eslint-disable-next-line no-console
    console.log('----LOAD LOCAL DATA TO SAVED DATA----');
    const data = this.localStorage.loadLocalData();
    if (data) {
      return (this.saveData = data);
    }
    return false;
  }

  clearPairings() {
    // eslint-disable-next-line no-console
    console.log('----CLEAR PAIRINGS----');
    this.saveData = INITIAL_SAVE_DATA;
    this.localStorage.removeItem();
  }

  connect() {
    // eslint-disable-next-line no-console
    console.log('----CONNECT----');
    if (!this.installedExtensions)
      throw new Error('Hashpack wallet is not installed!');
    if (typeof this.saveData?.pairingString === 'undefined')
      throw new Error('No pairing key generated! Initalize HashConnect first!');

    this.hashConnect.connectToLocalWallet(this.saveData.pairingString);
  }

  foundExtensionEventHandler(data: HashConnectTypes.AppMetadata) {
    // eslint-disable-next-line no-console
    console.log('----EXTENSION EVENT HANDLER----');
    this.installedExtensions.push(data);
    // eslint-disable-next-line no-console
    console.log({ foundExtensionEvent: { this: this, data } });
  }
  pairingEventHandler(data: MessageTypes.ApprovePairing) {
    // eslint-disable-next-line no-console
    console.log('----PAIRING EVENT HANDLER----');
    const { metadata, ...restData } = data;
    this.saveData.pairedWalletData = metadata;
    this.saveData = {
      ...this.saveData,
      ...restData,
    };
    this.localStorage.saveDataInLocalStorage({ ...data, ...this.saveData });
    // eslint-disable-next-line no-console
    console.log({ pairingEvent: { this: this, data } });
  }

  mount() {
    // eslint-disable-next-line no-console
    console.log('----MOUNT----');
    this.hashConnect.foundExtensionEvent.on((e) =>
      this.foundExtensionEventHandler(e)
    );
    this.hashConnect.pairingEvent.on((e) => this.pairingEventHandler(e));
  }

  unMount() {
    // eslint-disable-next-line no-console
    console.log('----UNMOUNT----');
    this.hashConnect.foundExtensionEvent.off((e) =>
      this.foundExtensionEventHandler(e)
    );
    this.hashConnect.pairingEvent.off((e) => this.pairingEventHandler(e));
  }

  getSaveData() {
    // eslint-disable-next-line no-console
    console.log('----GET SAVE DATA----');
    return this.saveData;
  }

  async init() {
    // eslint-disable-next-line no-console
    console.log('----INIT----');
    const localData = this.loadLocalDataToSavedData();
    try {
      if (!localData) {
        // eslint-disable-next-line no-console
        console.log('----FOUND LOCAL DATA----');
        //first init and store the private for later
        const initData = await this.hashConnect.init(
          INITIAL_METADATA ?? INITIAL_APP_CONFIG
        );
        this.saveData.privateKey = initData.privKey;

        //then connect, storing the new topic for later
        const state = await this.hashConnect.connect();
        this.saveData.topic = state.topic;

        //generate a pairing string, which you can display and generate a QR code from
        this.saveData.pairingString = this.hashConnect.generatePairingString(
          state,
          INITIAL_NETWORK ?? 'testnet',
          INITIAL_DEBUG_BODE ?? false
        );

        //find any supported local wallets
        this.hashConnect.findLocalWallets();
      } else {
        // eslint-disable-next-line no-console
        console.log('----NOT FOUND LOCAL DATA----');
        //use loaded data for initialization + connection
        await this.hashConnect.init(this.metaData, this.saveData.privateKey);
        await this.hashConnect.connect(
          this.saveData.topic,
          this.saveData.pairedWalletData
        );
        this.hashConnect.findLocalWallets();
      }
    } catch (e) {
      if (typeof e === 'string') {
        throw new Error(e);
      } else if (e instanceof Error) {
        throw new Error(e.message);
      }
    } finally {
      if (localData) {
        this.saveData = {
          ...this.saveData,
          ...localData,
        };
      }
    }
  }
}
