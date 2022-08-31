import React from 'react';
import FormGroup from '@/components/shared/form/FormGroup';

export default function OffChainPropertiesAndAttributes() {
  return (
    <div>
      <div className='form__row'>
        <FormGroup
          name='attributes'
          label='Attributes'
          inputsSchema={[
            {
              name: 'trait_type',
              type: 'text',
              label: 'Trait type',
              placeholder: 'e.g color'
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
      <div className='form__row'>
        <FormGroup
          name='properties'
          label='Properties'
          inputsSchema={[
            {
              name: 'label',
              type: 'text',
              label: 'Label',
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
    </div>
  );
}
