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
