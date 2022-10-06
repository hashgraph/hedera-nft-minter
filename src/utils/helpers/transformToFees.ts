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

import { FEE, Fees } from '@utils/entity/Fees';
import { Hbar, CustomFixedFee, CustomRoyaltyFee } from '@hashgraph/sdk';

type HederaFee = CustomFixedFee | CustomRoyaltyFee;

export default function transformToFees(fees: Fees[]): HederaFee[] {
  return fees.map(fee => {
    let fallbackFee = null;

    switch (fee.type) {
      case FEE.FIXED:
        fallbackFee = new CustomFixedFee({ feeCollectorAccountId: fee.accountId });

        fallbackFee.setHbarAmount(new Hbar(fee.amount));

        return fallbackFee;

      case FEE.ROYALTY:
        if (fee.fallbackFee) {
          fallbackFee = new CustomFixedFee().setHbarAmount(new Hbar(fee.fallbackFee))
        }
        return new CustomRoyaltyFee({
          ...fee,
          fallbackFee: fallbackFee !== null ? fallbackFee : undefined,
        });
    }
  });
}
