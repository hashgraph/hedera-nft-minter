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

import React, { useMemo } from 'react'
import { useField } from 'formik';
import find from 'lodash/find';

import firstLetterUppercase from '@utils/helpers/firstLetterUppercase';
import { Fees } from '@utils/entity/Fees';
import { TOKEN_KEY } from '@utils/entity/TokenKeys'

import { TokenKeys } from '@components/shared/minter-wizard/KeysTable';
import checkmarkIcon from '@assets/images/icons/checkmark.svg'

export default function SummaryAdvanced() {
  const [{ value: feesValue }] = useField<Fees[]>('fees');
  const [{ value: keysValue }] = useField<TOKEN_KEY[]>('keys');

  const renderFees = useMemo(() => (
    feesValue?.length == 0 ? null : (
      feesValue.map(element => (
        <div
          key={element.type}
          className='minter-wizard__summary__row'
        >
          <p>
            {element.type && firstLetterUppercase(element.type) + ' fee'}
          </p>
          <span>
            {element.type === 'fixed' && `${ element.amount }ℏ`}
                {element.type === 'royalty' && (
                  `${ element.percent }% (Fallback fee: ${ element.fallbackFee }ℏ)`
                )}
          </span>
        </div>
      ))
    )
  ), [feesValue]);

  const renderKeys = useMemo(() => (
    keysValue?.length == 0 ? null : (
      keysValue.map(element => (
        <div
          className='minter-wizard__summary__row'
          key={element}
        >
          <p>
            {find(TokenKeys, key => key.value === element)?.title} key
          </p>
          <span>
            <img src={checkmarkIcon} width={16} height={16} alt='checked' />
          </span>
        </div>
      ))
    )
  ), [keysValue]);


  if (feesValue?.length + keysValue?.length === 0) {
    return null;
  }

  return (
    <div className='minter-wizard__summary__column'>
      {renderFees}
      {renderKeys}
    </div>
  )
}
