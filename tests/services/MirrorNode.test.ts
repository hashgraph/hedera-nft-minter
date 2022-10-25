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

import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import MirrorNode from '@services/MirrorNode';
import { TokenSupplyType } from '../../src/utils/entity/TokenInfo';

jest.mock('@services/MirrorNode');

describe('Test MirrorNode service', () => {
  beforeEach(() => {
    MirrorNode.url = 'test_url';

    MirrorNode.fetchAccountInfo = (accountId) => (
      new Promise(resolve => resolve({
        balance: {
          account: accountId,
          balance: 10,
          tokens: [],
        },
        timestamp: '123456',
        key: { _type: 'ECDSE', key: 'lorem....' }
      }))
    );

    MirrorNode.fetchTokenInfo = () => (
      new Promise(resolve => resolve({
        admin_key: null,
        auto_renew_account: null,
        auto_renew_period: null,
        created_timestamp: '1660719957.665494003',
        decimals: 0,
        deleted: false,
        expiry_timestamp: '1660720991592000000',
        fee_schedule_key: null,
        freeze_default: false,
        freeze_key: null,
        initial_supply: '0',
        kyc_key: null,
        max_supply: '10',
        name: 'AVATAR',
        pause_key: null,
        pause_status: 'NOT_APPLICABLE',
        supply_key: { _type: 'ED25519', key: '3d9639fcb8137a17c0e0aba20a7fb5038f74269835ef32d3891415008e4db8d2' },
        supply_type: TokenSupplyType.FINITE,
        symbol: 'PM-AV',
        token_id: '0.0.47909758',
        total_supply: '4',
        treasury_account_id: '0.0.2661933',
        type: 'NON_FUNGIBLE_UNIQUE',
        wipe_key: null
      }))
    );
  })

  test('fetchAccountInfo', async () => {
    const data = await MirrorNode.fetchAccountInfo('0.0.123456');

    expect(data.balance.account).toBe('0.0.123456');
  });

  test('fetchTokenInfo', async () => {
    const data = await MirrorNode.fetchTokenInfo('0.0.123456');

    expect(data.admin_key).toBe(null);
  });

});
