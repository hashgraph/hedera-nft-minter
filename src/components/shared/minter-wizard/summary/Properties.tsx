import React, { useMemo } from 'react'
import { useField } from 'formik'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { Propertie } from '@/utils/entity/NFT-Metadata'
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows'

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
          <p className='summary__info__header'>
            General properties:
          </p>
          <div>
            <SummaryRows data={summaryRowsData} />
          </div>
        </div>
      )}
    </>

  )
}
