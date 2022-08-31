import { useField } from 'formik'
import React from 'react'
import { Attribute } from '@/utils/entity/NFT-Metadata'
import renderValue from '@/utils/helpers/renderValue'

export default function SummaryAttributes() {
  const [field] = useField('attributes')

  return (
    <div >
      {field.value
        .filter((attribute: Attribute) => (attribute.trait_type || attribute.value))
        .length > 0 && (
        <>
          <p className='summary__info__header'>
            NFT attributes:
          </p>
          <div>
            {field.value.map(((property: Attribute) => (
              <p className='minter-wizard__summary__info-row' key={property.trait_type}>
                {renderValue(property.trait_type)}: <span>{renderValue(property.value)}</span>
              </p>
            )))}
          </div>
        </>
      )}
    </div>
  )
}
