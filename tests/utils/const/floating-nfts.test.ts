import { describe, expect, it } from '@jest/globals';
import floatingFees from '@utils/const/floating-nfts';

describe('Floating nfts', () => {
  it('array', () => {
    expect(floatingFees).toStrictEqual(floatingFees)
  });
});
