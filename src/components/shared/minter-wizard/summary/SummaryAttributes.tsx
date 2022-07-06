import { useField } from 'formik'
import React from 'react'
import { Attribute } from '@/utils/entity/NFT-Metadata'
import renderValue from '@/utils/helpers/renderValue'

export default function SummaryAttributes() {
  const [field] = useField('attributes')

  return (
    <>
      <p className='summary__info__header'>
        NFT attributes:
      </p>
      {field.value
        .filter((attribute: Attribute) => (attribute.trait_type || attribute.value))
        .length > 0 ? (
        <>
          <div className='summary__info__multiple'>
            {field.value.map(((property: Attribute) => (
              <p key={property.trait_type}>
                {renderValue(property.trait_type)}: <span>{renderValue(property.value)}</span>
              </p>
            )))}
          </div>
        </>
      ) : (
        <div className='summary__info__row--empty'>(empty)</div>
      )}
    </>
  )
}
