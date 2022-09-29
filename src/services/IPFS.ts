import axios from 'axios';
import random from 'lodash/random';
import { IPFS_KEYS, IPFS_URL } from '@/../Global.d';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';

export interface UploadRespone {
  ok: boolean,
  value: {
    cid: string;
    created: string;
    deals?: [];
    files?: File[];
    name: string;
    pin?: {
      cid: string;
      created: string;
      size: number;
      status: string;
    };
    scope: string;
    size: number;
    type: string;
  };
}

export default class IPFS {
  static readonly UPLOAD_URL = '/upload';
  static readonly instance = axios.create({
    baseURL: IPFS_URL,
  });

  static async uploadFile(file: File | Blob) {
    try {
      return await this.instance.post<UploadRespone>(this.UPLOAD_URL, file, {
        headers: {
          'Content-Type': 'image/*',
          Authorization: `Bearer ${ IPFS_KEYS[random(0, IPFS_KEYS.length - 1)] }`,
        }
      });
    } catch (e) {
      throw new Error('Too many request while uploading image! Try again in few secs...')
    }
  }

  static async createMetadataFile(meta: NFTMetadata) {
    try {
      const file = new File([JSON.stringify(meta)], 'meta.json', { type: 'application/json' });

      return await this.instance.post<UploadRespone>(this.UPLOAD_URL, file, {
        headers: {
          Authorization: `Bearer ${ IPFS_KEYS[random(0, IPFS_KEYS.length - 1)] }`,
        }
      });
    } catch (e) {
      throw new Error('Too many request! Try again in few secs...')
    }
  }
}
