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

import { describe, it, expect } from '@jest/globals';
import transformToKeys from '@utils/helpers/transformToKeys';
import { AccountId, PublicKey } from '@hashgraph/sdk';

const keys = [
  'kycKey',
  'freezeKey',
  'pauseKey',
  'feeScheduleKey'
];

const accountId = AccountId.fromString('0.0.2661933');
const accountKey = PublicKey.fromString('3d9639fcb8137a17c0e0aba20a7fb5038f74269835ef32d3891415008e4db8d2');

const correctAnswerer = {
  'kycKey': accountKey,
  'freezeKey': accountKey,
  'pauseKey': accountKey,
  'feeScheduleKey': accountKey,
  'treasuryAccountId': accountId,
}

describe('Transform to keys', () => {
  it('keys transform', () => {
    expect(transformToKeys(keys, accountId.toString(), accountKey.toStringRaw())).toEqual(correctAnswerer);
  });
});
