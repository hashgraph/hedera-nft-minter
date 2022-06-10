import React from 'react';
import FormGroup from '@/components/shared/form/FormGroup';

export default function Advanced() {
  return (
    <div>
      <div className='form__row__two-columns'>
        <FormGroup
          name='properties'
          inputsSchema={[
            {
              name: 'name',
              type: 'text',
              label: 'Name',
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
            },
          ]}
        />
        <FormGroup
          name='attributes'
          inputsSchema={[
            {
              name: 'trait_type',
              type: 'text',
              label: 'Trait type',
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
            },
          ]}
        />
      </div>
    </div>
  );
}
