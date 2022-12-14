/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import axios from 'axios';
import random from 'lodash/random';
import { IPFS_URL, IPFS_KEYS } from '@src/../Global.d';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';

export interface UploadResponse {
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
      return await this.instance.post<UploadResponse>(this.UPLOAD_URL, file, {
        headers: {
          'Content-Type': 'image/*',
          Authorization: `Bearer ${ IPFS_KEYS[random(0, IPFS_KEYS.length - 1)] }`,
        }
      });

    } catch (e) {
      throw new Error('We are experiencing very high demand. Please retry in 2 minutes.')
    }
  }

  static async createMetadataFile(meta: NFTMetadata) {
    try {
      const file = new File([JSON.stringify(meta)], 'meta.json', { type: 'application/json' });

      return await this.instance.post<UploadResponse>(this.UPLOAD_URL, file, {
        headers: {
          Authorization: `Bearer ${ IPFS_KEYS[random(0, IPFS_KEYS.length - 1)] }`,
        }
      });
    } catch (e) {
      throw new Error('We are experiencing very high demand. Please retry in 2 minutes.')
    }
  }
}
