import axios from 'axios';
import { IPFS_KEY, IPFS_URL } from '@/../Global.d';
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
    headers: {
      Authorization: `Bearer ${ IPFS_KEY }`,
    }
  });

  static async uploadFile(file: File | Blob) {
    return this.instance.post<UploadRespone>(this.UPLOAD_URL, file, {
      headers: {
        'Content-Type': 'image/*'
      }
    });
  }

  static async createMetadataFile(meta: NFTMetadata) {
    const file = new File([JSON.stringify(meta)], 'meta.json', { type: 'application/json' });

    return this.instance.post<UploadRespone>(this.UPLOAD_URL, file);
  }
}
