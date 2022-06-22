import React from 'react';
import FormGroup from '@/components/shared/form/FormGroup';

export default function OffChainPropertiesAndAttributes() {
  return (
    <div>
      <div className='form__row'>
        <FormGroup
          name='properties'
          inputsSchema={[
            {
              name: 'name',
              type: 'text',
              label: 'Name',
              placeholder: 'e.g website'
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              placeholder: 'e.g www.mysite.com'
            },
          ]}
        />
      </div>
      <div className='form__row'>
        <FormGroup
          name='attributes'
          inputsSchema={[
            {
              name: 'trait_type',
              type: 'text',
              label: 'Trait type',
              placeholder: 'e.g hair'
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              placeholder: 'e.g blue'
            },
          ]}
        />
      </div>
    </div>
  );
}
