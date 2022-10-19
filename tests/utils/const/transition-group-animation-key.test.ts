import { describe, expect, it } from '@jest/globals';
import transitionGroupAnimationKeys from '@utils/const/transition-group-animation-keys';

describe('transition-group-animation-keys', () => {
  it('array', () => {
    expect(transitionGroupAnimationKeys).toStrictEqual(transitionGroupAnimationKeys)
  });
});
