import { IPFS_KEY, IPFS_URL } from '@/../Global.d';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import axios from 'axios';

export default class IPFS {
  static readonly STORE_URL = '/store';
  static readonly UPLOAD_URL = '/upload';
  static readonly instance = axios.create({
    baseURL: IPFS_URL,
    headers: {
      Authorization: `Bearer ${ IPFS_KEY }`,
    }
  });

  static async uploadFile(file: File | Blob) {
    return this.instance.post(this.UPLOAD_URL, file, {
      headers: {
        'Content-Type': 'image/*'
      }
    });
  }

  static async createMetadataFile(meta: NFTMetadata) {
    const file = new File([JSON.stringify(meta)], 'meta.json', { type: 'application/json' });

    return this.instance.post(this.UPLOAD_URL, file);
  }
}
