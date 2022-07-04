import { useField } from 'formik'
import React from 'react'
import { Propertie } from '@/utils/entity/NFT-Metadata'
import renderValue from '@/utils/helpers/renderValue'

export default function SummaryProperties() {
  const [field] = useField('properties')

  return (
    <>
      <p className='summary__info__header'>
          General properties:
        </p>
        {field.value
          .filter((property: Propertie) => (property.label || property.value))
          .length > 0 ? (
          <>
            <div className='summary__info__multiple'>
              {field.value.map(((property: Propertie) => (property.label && property.value) && (
                <p key={property.label}>
                  {renderValue(property.label)}: <span>{renderValue(property.value)}</span>
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
