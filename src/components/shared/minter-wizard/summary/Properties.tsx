import React from 'react'
import { useField } from 'formik'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { Propertie } from '@/utils/entity/NFT-Metadata'
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows'

export default function SummaryProperties() {
  const [field] = useField('properties')

  return (
    <>
      {filter(field.value, (property: Propertie) => (property.label || property.value))
        .length > 0 && (
          <div>
            <p className='summary__info__header'>
              General properties:
            </p>
            <div>
              <SummaryRows
                data={
                  map(field.value, (property: Propertie) => ({
                    title: property.label,
                    fieldValue: property.value,
                  }))
                }
              />
            </div>
          </div>
        )
      }
    </>

  )
}
