import { describe, it, expect } from '@jest/globals';
import formatToIPFSImageLink from '@utils/helpers/formatToIPFSImageLink';

describe('Format link to IPFS', () => {
  it('with https://', () => {
    expect(formatToIPFSImageLink('https://test')).toBe('https://test')
  });

  it('first letter to upper', () => {
    expect(formatToIPFSImageLink('ipfs://1234567890')).toBe('https://ipfs.io/ipfs/1234567890')
  });
});
