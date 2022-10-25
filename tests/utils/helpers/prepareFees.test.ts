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
import prepareFees from '@utils/helpers/prepareFees';
import { FEE, Fees } from '@utils/entity/Fees';
import { CustomFixedFee, CustomRoyaltyFee, Hbar } from '@hashgraph/sdk';

describe('Prepare Fees', () => {
  it('empty', () => {
    expect(prepareFees([], '')).toStrictEqual([])
  });

  it('should be fixed fee', () => {
    const fees: Fees[] = [
      { type: FEE.FIXED, amount: 10, accountId: '1234567890' },
    ];

    const shouldBe = new CustomFixedFee({feeCollectorAccountId: '0987654321'});

    shouldBe.setHbarAmount(new Hbar(10))

    expect(prepareFees(fees, '0987654321')).toStrictEqual([shouldBe])
  });

  it('should be royalty fee', () => {
    const fee: Fees = {
      type: FEE.ROYALTY,
      percent: 10,
      fallbackFee: 10,
      feeCollectorAccountId: '1234567890'
    };

    const shouldBe = new CustomFixedFee();

    shouldBe.setHbarAmount(new Hbar(10))

    const royaltyFee = new CustomRoyaltyFee({
      numerator: fee.percent,
      denominator: 100,
      feeCollectorAccountId: '1234567890',
      fallbackFee: shouldBe,
    })

    expect(prepareFees([fee], '0987654321')).toStrictEqual([royaltyFee])
  });

  it('should be royalty fee without fallbackFee', () => {
    const fee: Fees = {
      type: FEE.ROYALTY,
      percent: 10,
      feeCollectorAccountId: '1234567890'
    };

    const royaltyFee = new CustomRoyaltyFee({
      numerator: fee.percent,
      denominator: 100,
      feeCollectorAccountId: '1234567890',
    })

    expect(prepareFees([fee], '0987654321')).toStrictEqual([royaltyFee])
  });
});
