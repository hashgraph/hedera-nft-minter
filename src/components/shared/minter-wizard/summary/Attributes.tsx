import React from 'react'
import { useField } from 'formik'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { Attribute } from '@/utils/entity/NFT-Metadata'
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows'

export default function SummaryProperties() {
  const [field] = useField('attributes')

  return (
    <>
      {filter(field.value, (attribute: Attribute) => (attribute.trait_type || attribute.value))
        .length > 0 && (
          <div>
            <p className='summary__info__header'>
              NFT attributes:
            </p>
            <div>
              <SummaryRows
                data={
                  map(field.value, (attribute: Attribute) => ({
                    title: attribute.trait_type,
                    fieldValue: attribute.value,
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
