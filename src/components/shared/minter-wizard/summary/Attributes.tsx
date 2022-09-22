import React, { useMemo } from 'react'
import { useField } from 'formik'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { Attribute } from '@/utils/entity/NFT-Metadata'
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows'

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
