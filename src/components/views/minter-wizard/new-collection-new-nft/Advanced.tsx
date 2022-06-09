import React, { useState } from 'react';
import FormGroup from '@/components/shared/form/FormGroup';
import MinterWizardFees from '@/components/shared/minter-wizard/minter-wizard-fees';
import MinterWizardKeys from '@/components/shared/minter-wizard/minter-wizard-keys';

export default function Advanced() {
  const [wantFees, setWantFees] = useState(false)
  const [wantKeys, setWantKeys] = useState(false)

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
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
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
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
            },
          ]}
        />
      </div>
      <div className='form__row'>
        <div>
          <label htmlFor='null'>
            Are you want to add fees?
            <button
              type='button'
              onClick={() => setWantFees(prev => !prev)}
            >
              Toogle
            </button>
          </label>
          {wantFees && (
            <MinterWizardFees />
          )}
        </div>
      </div>
      <div className='form__row'>
        <div>
          <label htmlFor='null'>
            Are you want to add custom keys?
            <button
              type='button'
              onClick={() => setWantKeys(prev => !prev)}
            >
              Toogle
            </button>
          </label>

          {wantKeys && (
            <MinterWizardKeys />
          )}
        </div>
      </div>
    </div>
  );
}
