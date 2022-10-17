import { describe, it, expect } from '@jest/globals';
import firstLetterUppercase from '@utils/helpers/firstLetterUppercase';

describe('FirstLetterUppercase', () => {
  it('first letter to upper', () => {
    expect(firstLetterUppercase('test')).toBe('Test')
  });
});
