/** @jest-environment jsdom */

import { describe, it, expect } from '@jest/globals';
import { loadLocalData } from '@utils/helpers/loadLocalData';
import { localStorageMock } from '../../mocks/localstorage';

describe('Load local data', () => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  it('load local data', () => {
    expect(loadLocalData('test')).toBe(null)
  });
});
