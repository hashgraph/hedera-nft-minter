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
              placeholder: 'E.g. \'website\''
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              placeholder: 'E.g. \'www.mysite.com\''
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
              placeholder: 'E.g. \'hair\''
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              placeholder: 'E.g. \'blue\''
            },
          ]}
        />
      </div>
    </div>
  );
}
