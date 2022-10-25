/** @jest-environment jsdom */

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

import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import IPFS from '@services/IPFS';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';

jest.mock('@services/IPFS');

const exampleFile = new File(['foo'], 'foo.txt', { type: 'text/plain'});
const exampleFile2 = new File(['foo'], 'foo2.txt', { type: 'text/plain'});

const correctResponse = {
  data: {
    ok: true,
    value: {
      cid: 'test',
      created: new Date().toDateString(),
      name: 'test',
      scope: 'test',
      size: 10,
      type: 'file'
    }
  },
  headers: null,
  status: 200,
  statusText: 'done',
  config: {}
}

describe('Test IPFS service', () => {
  beforeEach(() => {
    IPFS.uploadFile = (file: File) => new Promise((resolve) => {
      if (file.name === 'foo2.txt') { throw new Error('INCORRECT_FILE')}

      resolve(correctResponse)
    });

    IPFS.createMetadataFile = (meta: NFTMetadata) => new Promise((resolve) => {
      if (meta.name === 'fail') { throw new Error('INCORRECT_METADATA')}

      resolve(correctResponse)
    });
  })

  test('upload file', async () => {
    expect.assertions(1);
    try {
      const res = await IPFS.uploadFile(exampleFile);

      expect(res.data.ok).toBe(true)
    } catch (e) {
      expect(e.message).toBe('INCORRECT_FILE')
    }
  });

  test('upload file - thrown', async () => {
    expect.assertions(1);
    try {
      const res = await IPFS.uploadFile(exampleFile2);

      expect(res.data.ok).toBe(true)
    } catch (e) {
      expect(e.message).toBe('INCORRECT_FILE')
    }
  });

  test('create metadata', async () => {
    const metadata: NFTMetadata = {
      name: 'test',
      creator: 'tester',
    };

    expect.assertions(1);
    try {
      const res = await IPFS.createMetadataFile(metadata);

      expect(res.data.ok).toBe(true)
    } catch (e) {
      expect(e.message).toBe('INCORRECT_METADATA')
    }
  });

  test('create metadata - throw', async () => {
    const metadata: NFTMetadata = {
      name: 'fail',
      creator: 'tester',
    };

    expect.assertions(1);
    try {
      const res = await IPFS.createMetadataFile(metadata);

      expect(res.data.ok).toBe(true)
    } catch (e) {
      expect(e.message).toBe('INCORRECT_METADATA')
    }

  });
});
