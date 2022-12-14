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

import React from 'react';
import FieldWrapper from '@components/shared/form/FieldWrapper';
import Tooltip from '@components/shared/form/Tooltip';

type FixedFeeProps = {
  index: number;
}

export default function FixedFee({index} : FixedFeeProps) {
  return (
    <>
      <Tooltip title='Fixed fee' showLabel>
        A fixed number of units (hbar or token) to assess as a fee during a
        CryptoTransfer that transfers units of the token to which this fixed fee
        is attached
      </Tooltip>
      <div className='form__row__fees__fee'>
        <FieldWrapper
          name={`fees.${ index }.amount`}
          type='number'
          placeholder='e.g. 15'
          label='# amount ℏ'
        />
      </div>
    </>
  )
}
