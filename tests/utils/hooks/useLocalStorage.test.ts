/** @jest-environment jsdom */

import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import TestRenderer from 'react-test-renderer';

import useLocalStorage from '@utils/hooks/useLocalStorage';
import { localStorageMock } from '../../mocks/localstorage';
const {act} = TestRenderer;

describe('hook useLocalStorage', () => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  it('undefined', () => {
    const { result } = renderHook(() => useLocalStorage('test'));

    expect(result.current[0]).toEqual(undefined);
  });

  it('foo', () => {
    const { result } = renderHook(() => useLocalStorage('foo'));
    const value = result.current[0] as string

    expect(JSON.parse(value)).toEqual('test');
  });

  it('change', () => {
    const { result } = renderHook(() => useLocalStorage('foo'));
    const change = result.current[1] as (v: string) => void;

    expect(JSON.parse(result.current[0] as string)).toEqual('test');

    act(() => { change('newValue')});

    expect(result.current[0]).toEqual('newValue');
  });
});
