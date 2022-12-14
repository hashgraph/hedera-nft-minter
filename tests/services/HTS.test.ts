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

import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { AccountId, Hbar, TokenCreateTransaction, TokenMintTransaction, TokenType, TokenSupplyType, TokenUpdateTransaction, TransactionId, TransferTransaction } from '@hashgraph/sdk'
import HTS, { NewTokenType } from '@services/HTS';

describe('Test HTS service', () => {
  const now = Date.now();

  Date.now = () => now;

  beforeEach(() => {
    const mockFn = jest.fn().mockReturnValue(TransactionId.fromString('0.0.123456@1666180043.380955673'));

    TransactionId.generate = mockFn as () => TransactionId;

  });

  // eslint-disable-next-line no-undef
  const overrideFetch = (data: unknown) => global.fetch = jest.fn(() =>
    Promise.resolve({
      headers: new Headers(),
      ok: true,
      redirected: false,
      status: 200,
      statusText: 'OK',
      trailer: new Promise<Headers>((r) => r(new Headers())),
      // eslint-disable-next-line no-undef
      type: 'basic' as ResponseType,
      url: 'url',
      body: null,
      bodyUsed: true,
      clone: () => new Response(),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(1)),
      formData: () => Promise.resolve(new FormData()),
      blob: () => Promise.resolve(new Blob()),
      text: () => Promise.resolve('test'),
      json: () => Promise.resolve(data),
    })
  );

  test('createToken - success', async () => {
    const accountInfo = {
      result: 'ok',
      key: {
        key: '123456'
      }
    };

    overrideFetch(accountInfo);

    const tokenProps: NewTokenType = {
      accountId: '0.0.123456',
      tokenName: 'Test',
      tokenSymbol: 'TT',
      amount: 10,
    }
    const mintTx = await HTS.createToken(tokenProps);

    expect(mintTx).toEqual(
      new TokenCreateTransaction({
        tokenType: TokenType.NonFungibleUnique,
        supplyType: TokenSupplyType.Finite,
        decimals: 0,
        expirationTime: new Date(now + 3600 * 24 * 12),
        ...tokenProps,
        customFees: [],
      })
        .setMaxTransactionFee(50)
    );
  });

  test('createToken - failed', async () => {
    // eslint-disable-next-line no-undef
    overrideFetch({});

    const tokenProps: NewTokenType = {
      accountId: '0.0.123456',
      tokenName: 'Test',
      tokenSymbol: 'TT',
      amount: 10,
    }

    expect.assertions(1);
    try {
      await HTS.createToken(tokenProps);
    } catch (e) {
      expect(e.message).toBe('Error while trying to fetch user Public key.')
    }

  });

  test('mintToken', async () => {
    const mintTx = HTS.mintToken('0.0.123456', '0.0.987654', ['bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm']);

    expect(mintTx).toEqual(
      new TokenMintTransaction()
        .setTransactionId(TransactionId.generate('test'))
        .setTokenId('0.0.123456')
        .setNodeAccountIds([new AccountId(3)])
        .setMetadata([Buffer.from('ipfs://bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm')])
        .freeze()
    );
  });

  test('updateToken', async () => {
    const updateTx = HTS.updateToken('0.0.123456', '0.0.987654', {
      tokenName: 'test'
    });

    expect(updateTx).toEqual(
      new TokenUpdateTransaction({ tokenName: 'test' })
        .setTransactionId(TransactionId.generate('test'))
        .setTokenId('0.0.123456')
        .setNodeAccountIds([new AccountId(3)])
        .freeze()
    );
  });

  test('sendNFT', async () => {
    const updateTx = HTS.sendNFT('0.0.123456', 0,'0.0.987654', '0.0.654321');

    expect(updateTx).toEqual(
      new TransferTransaction()
        .setTransactionId(TransactionId.generate('test'))
        .addNftTransfer('0.0.123456', 0, '0.0.987654', '0.0.654321')
        .setNodeAccountIds([new AccountId(3)])
        .freeze()
    );
  });


  test('sendNFT', async () => {
    const updateTx = HTS.transfer('0.0.987654', '0.0.654321');

    expect(updateTx).toEqual(
      new TransferTransaction()
        .setTransactionId(TransactionId.generate('test'))
        .addHbarTransfer('0.0.987654', new Hbar(-1))
        .addHbarTransfer('0.0.654321', new Hbar(1))
        .setNodeAccountIds([new AccountId(3)])
        .freeze()
    );
  });




});
