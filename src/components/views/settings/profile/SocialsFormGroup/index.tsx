
import React from 'react'
import map from 'lodash/map'
import './socials-form-group.scss'
import useSocialsData from '@/utils/hooks/useSocialsData'
import IconFieldWrapper from '@/components/shared/form/IconFieldWrapper'


export default function SocialsFormGroup() {
  const socialsData = useSocialsData()

  return (
    <div className='socials-groups'>
      <label htmlFor='null'>Links</label>
      {map(socialsData, el => (
        <IconFieldWrapper
          name={el.alt}
          placeholder={el.placeholder}
          type={'text'}
          icon={<img src={el.icon} alt={el.alt} />}
          isFormikField
        />
      ))}
    </div>
  )
}
