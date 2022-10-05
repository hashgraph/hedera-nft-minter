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

import transformToFees from '@helpers/transformToFees';
import { FEE, Fees } from '@utils/entity/Fees';
import pick from 'lodash/pick';

const prepareFees = (customFees: Fees[], accountId: string) => {
  const filteredFees = customFees
    .map(fee => {
      switch (fee.type) {
        case FEE.FIXED:
          return {
            ...pick(fee, [
              'amount',
              'type',
            ]),
            accountId,
          }

        case FEE.ROYALTY:
          return {
            numerator: fee.percent,
            denominator: 100,
            ...pick(fee, [
              'feeCollectorAccountId',
              'fallbackFee',
              'type'
            ])
          }
      }
    })

  return transformToFees(filteredFees);
}


export default prepareFees
