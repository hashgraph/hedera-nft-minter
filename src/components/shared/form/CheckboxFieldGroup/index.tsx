import React from 'react'
import map from 'lodash/map'
import
  CheckboxField,
  { CheckboxFieldProps }
from '@components/shared/form/CheckboxField'
import './checkbox-field-group.scss'

type Props = {
  data: CheckboxFieldProps[],
  onEachFieldValueChange: () => void
}

export default function CheckboxFieldGroup({ data, onEachFieldValueChange }: Props) {

  return (
    <div className='checkbox-field-group'>
      {map(data, el => (
        <CheckboxField
          name={el.name}
          title={el.title}
          description={el.description}
          onChange={onEachFieldValueChange}
        />
      ))}
    </div>
  )
}
