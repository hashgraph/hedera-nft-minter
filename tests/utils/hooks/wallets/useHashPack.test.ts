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

import { describe, it, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import useHashPack from '@utils/hooks/wallets/useHashPack';

jest.mock('hashconnect', () => {
  return {
    HashConnectTypes: {
      WalletMetadata: {},
      SavedPairingData: {},
    },
    HashConnect: jest.fn(() => ({
      hcData: {
        pairingString: 'test',
        availableExtension: ['test'],
      },
      availableExtension: ['test'],
      connectToLocalWallet: jest.fn(),
      init: jest.fn(() => ({
        topic: '',
        pairingString: 'test-pairing-string',
        encryptionKey: '',
        savedPairings: [],
        availableExtension: ['test'],
        hcData: {
          availableExtension: ['test'],
          pairingString: 'test',
        },
        connectToLocalWallet: jest.fn(),
      })),
      foundExtensionEvent: {
        on: jest.fn(),
        off: jest.fn(),
      },
      pairingEvent: {
        on: jest.fn(),
        off: jest.fn(),
      },
      foundIframeEvent: {
        on: jest.fn(),
        off: jest.fn(),
      },
    })),
  };
});

describe('useHashPack', () => {
  it('render', async () => {
    const { result } = renderHook(() => useHashPack());

    result.current.hashConnectState.availableExtension = {
      name: 'test',
      description: 'test',
      icon: 'test',
    };

    expect(result.current.hashConnectState).toEqual({
      availableExtension: {
        name: 'test',
        description: 'test',
        icon: 'test',
      },
    });

    expect.assertions(1);
    await result.current.connectToHashPack();
  });

  it('throws an error if hashpack wallet is not detected', () => {
    const { result } = renderHook(() => useHashPack());

    expect(() => {
      result.current.connectToHashPack();
    }).toThrow('Hashpack wallet is not detected!');
  });
});
