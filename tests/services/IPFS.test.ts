/** @jest-environment jsdom */

import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import IPFS from '@services/IPFS';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';

jest.mock('@services/IPFS');

describe('Test IPFS service', () => {
  beforeEach(() => {
    (IPFS as unknown as jest.Mock).mockImplementation(() => ({
      uploadFile: async (file: File) => {
        console.log({ file });
      },
      createMetadataFile: async (data: NFTMetadata) => {
        console.log({ data });
      },
    }));
  })

  test('upload file', async () => {
    const metadata: NFTMetadata = {
      name: 'test',
      creator: 'tester',
    };

    expect(IPFS.createMetadataFile(metadata))

  });

  test('create metadata', async () => {
    const metadata: NFTMetadata = {
      name: 'test',
      creator: 'tester',
    };

    expect(IPFS.createMetadataFile(metadata))

  });
});
