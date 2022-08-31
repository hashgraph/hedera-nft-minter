import { useField } from 'formik'
import React from 'react'
import { Propertie } from '@/utils/entity/NFT-Metadata'
import renderValue from '@/utils/helpers/renderValue'

export default function SummaryProperties() {
  const [field] = useField('properties')

  return (
    <div>
        {field.value
          .filter((property: Propertie) => (property.label || property.value))
          .length > 0 && (
          <>
            <p className='summary__info__header'>
              General properties:
            </p>
            <div>
              {field.value.map(((property: Propertie) => (property.label && property.value) && (
                <p key={property.label} className='minter-wizard__summary__info-row'>
                  {renderValue(property.label)}: <span>{renderValue(property.value)}</span>
                </p>
              )))}
            </div>
          </>
        )}
    </div>
  )
}
