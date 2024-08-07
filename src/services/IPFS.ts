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

import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';
import { IPFS_GATEWAYS, PINATA_API_URL, PINATA_JWT_KEYS } from '@src/../Global.d';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import random from 'lodash/random';

export interface UploadResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
}

const DEFAULT_IPFS_PROVIDER = 'https://ipfs.io/ipfs/{CID}'

export default class IPFS {
  static readonly UPLOAD_URL = '/pinning/pinFileToIPFS';
  static readonly instance = axios.create({
    baseURL: PINATA_API_URL,
  });
  static gateways = IPFS_GATEWAYS ?? [DEFAULT_IPFS_PROVIDER];

  static async uploadFile(file: File | Blob) {
    try {
      const options =
        !!PINATA_JWT_KEYS && PINATA_JWT_KEYS.length > 0
          ? {
              headers: {
                Authorization: `Bearer ${
                  PINATA_JWT_KEYS[random(0, PINATA_JWT_KEYS.length - 1)]
                }`,
              },
            }
          : undefined;

      const data = new FormData();

      data.append('file', file);

      return await this.instance.post<UploadResponse>(
        this.UPLOAD_URL,
        data,
        options
      );
    } catch (e) {
      throw new Error(
        'We are experiencing very high demand. Please retry in 2 minutes.'
      );
    }
  }

  static async createMetadataFile(meta: NFTMetadata) {
    try {
      const options =
        !!PINATA_JWT_KEYS && PINATA_JWT_KEYS.length > 0
          ? {
              headers: {
                Authorization: `Bearer ${
                  PINATA_JWT_KEYS[random(0, PINATA_JWT_KEYS.length - 1)]
                }`,
              },
            }
          : undefined;

      return await this.instance.post<UploadResponse>(
        'pinning/pinJSONToIPFS',
        JSON.stringify(meta),
        options
      );
    } catch (e) {
      throw new Error(
        'We are experiencing very high demand. Please retry in 2 minutes.'
      );
    }
  }
  static async fetchDataFromCid(cid: string): Promise<NFTMetadata> {
    let counter = 0;

    do {
      const url = this.gateways[counter].replace('{CID}', cid);
      let res: AxiosResponse<NFTMetadata> | null = null;

      try {
        res = await IPFS.instance.get(url);
      } catch {
        counter = counter + 1;
        continue;
      }

      if (res && res.status === 200) {
        return res.data;
      }
    } while (counter < this.gateways.length);

    throw new Error('Fetch metadata failed');
  }

  static async fetchData(metadata: string) {
    if (/^0*$/.test(Buffer.from(metadata).toString('hex'))) {
      return null;
    }

    if (metadata.includes('https://')) {
      const { data } = await this.instance.get(metadata);

      return data;
    }

    return await this.fetchDataFromCid(atob(metadata).replace('ipfs://', ''));
  }

  static async fetchImage(cidImage: string) {
    let counter = 0;

    do {
      const url = this.gateways[counter].replace('{CID}', cidImage);
      let res: AxiosResponse | null = null;

      try {
        res = await IPFS.instance.get(url, {
          responseType: 'arraybuffer',
        });
      } catch {
        counter = counter + 1;
        continue;
      }

      if (res && res.status === 200) {
        const { data, headers } = res;
        const base64 = Buffer.from(data, 'binary').toString('base64');
        const src = `data:${ headers['content-type'] };base64,${ base64 }`;

        return src;
      }
    } while (counter < this.gateways.length);

    throw new Error('Fetch image failed');
  }
}
