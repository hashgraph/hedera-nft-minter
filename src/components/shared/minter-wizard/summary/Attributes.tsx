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
import { useField } from 'formik'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { Attribute } from '@utils/entity/NFT-Metadata'
import SummaryRows from '@components/shared/minter-wizard/summary/SummaryRows'

export default function SummaryAttributes() {
  const [field] = useField('attributes')

  const attributes = useMemo(() => (
    filter(field.value, (attribute: Attribute) => (attribute.trait_type || attribute.value))
  ), [field.value])

  const summaryRowsData = useMemo(() => (
    map(field.value, (attribute: Attribute) => ({
      title: attribute.trait_type,
      fieldValue: attribute.value,
    }))
  ), [field.value])

  return (
    <>
      {attributes.length > 0 && (
        <div>
          <p className='minter-wizard__summary__header'>
            NFT attributes:
          </p>
          <div className='minter-wizard__summary__row__group'>
            <SummaryRows data={summaryRowsData} />
          </div>
        </div>
      )}
    </>
  )
}
