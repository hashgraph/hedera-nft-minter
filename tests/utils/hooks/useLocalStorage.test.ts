/** @jest-environment jsdom */

import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import useLocalStorage from '@utils/hooks/useLocalStorage';

import { localStorageMock } from '../../mocks/localstorage';
import { act } from 'react-dom/test-utils';

describe('hook useLocalStorage', () => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  it('undefined', () => {
    const { result } = renderHook(() => useLocalStorage('test'));

    expect(result.current[0]).toEqual(undefined);
  });

  it('foo', () => {
    const { result } = renderHook(() => useLocalStorage('foo'));

    expect(result.current[0]).toEqual('test');
  });

  it('change', () => {
    const { result } = renderHook(() => useLocalStorage('foo'));
    const change = result.current[1] as (v: string) => void;

    expect(result.current[0]).toEqual('test');

    act(() => { change('newValue')});
    expect(result.current[0]).toEqual('newValue');
  });
});
