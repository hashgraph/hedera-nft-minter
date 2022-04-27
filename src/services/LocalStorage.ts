import { MetadataType, NetworkType } from '@/utils/consts/hashconnect-connection-consts-types'

type LocalStorageDataType = {
  accountsIds?: string[];
  id?: string;
  metadata?: MetadataType;
  network?: NetworkType;
  pairedAccounts?:string[];
  pairingString?: string;
  privateKey?: string;
  topic?: string;
}

export default class LocalStorage {
  readonly itemName: string;

  constructor(itemName : string){
    this.itemName = itemName
  }
  loadLocalData(itemName:string = this.itemName) {
    const foundData = localStorage.getItem(itemName);
    if (foundData) {
      const saveData = JSON.parse(foundData);
      return saveData;
    } else return null;
  }

  saveDataInLocalStorage(data:LocalStorageDataType, itemName: string = this.itemName){
    const dataToSave = JSON.stringify({ ...data });
    localStorage.setItem(itemName, dataToSave);
  }

  removeItem(itemName: string = this.itemName){
    localStorage.removeItem(itemName);
  }
}
