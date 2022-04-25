import { HashConnect as HashConnectInit, HashConnectTypes } from 'hashconnect';

interface SavedData {
  topic: string,
  pairingString: string,
  privateKey: string,
  pairedAccounts: string[],
  pairedWalletData: HashConnectTypes.AppMetadata | HashConnectTypes.WalletMetadata | undefined,
}

export default class HashConnect {
  readonly hashconnect = new HashConnectInit(true);

  readonly appMetadata: HashConnectTypes.AppMetadata = {
    name: 'Mint NFT Example',
    description: 'Description',
    icon: 'Test app',
  }

  saveData: SavedData = {
    topic: '',
    pairingString: '',
    privateKey: '',
    pairedAccounts: [],
    pairedWalletData: undefined
  }

  async init () {
    if (!this.loadLocalData()) {
      //first init and store the private for later
      const initData = await this.hashconnect.init(this.appMetadata);
      this.saveData.privateKey = initData.privKey;

      //then connect, storing the new topic for later
      const state = await this.hashconnect.connect();
      this.saveData.topic = state.topic;

      //generate a pairing string, which you can display and generate a QR code from
      this.saveData.pairingString = this.hashconnect.generatePairingString(state, 'testnet', true);

      localStorage.setItem('hashconnectData', JSON.stringify(this.saveData));

      //find any supported local wallets
      this.hashconnect.findLocalWallets();
    }
    else {
      //use loaded data for initialization + connection
      await this.hashconnect.init(this.appMetadata, this.saveData.privateKey);
      await this.hashconnect.connect(this.saveData.topic, this.saveData.pairedWalletData);
    }

    this.hashconnect.connectToLocalWallet(this.saveData.pairingString);
  }

  loadLocalData(): boolean {
    const foundData = localStorage.getItem('hashconnectData');

    if(foundData){
      this.saveData = JSON.parse(foundData);
      return true;
    }
    else
      return false;
  }
}
