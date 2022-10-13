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
import { Propertie } from '@utils/entity/NFT-Metadata'
import SummaryRows from '@components/shared/minter-wizard/summary/SummaryRows'

export default function SummaryProperties() {
  const [field] = useField('properties')

  const properties = useMemo(() => (
    filter(field.value, (property: Propertie) => (property.label || property.value))
  ), [field.value])

  const summaryRowsData = useMemo(() => (
    map(field.value, (property: Propertie) => ({
      title: property.label,
      fieldValue: property.value,
    }))
  ), [field.value])

  return (
    <>
      {properties.length > 0 && (
        <div>
          <p className='minter-wizard__summary__header'>
            General properties:
          </p>
          <div className='minter-wizard__summary__row__group'>
            <SummaryRows data={summaryRowsData} />
          </div>
        </div>
      )}
    </>

  )
}
