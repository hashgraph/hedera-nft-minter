import React, { useState } from 'react';
import FormGroup from '@/components/shared/form/FormGroup';
import MinterWizardFees from '@/components/shared/minter-wizard/minter-wizard-fees';
import MinterWizardKeys from '@/components/shared/minter-wizard/minter-wizard-keys';

export default function Advenced() {
  const [wantFees, setWantFees] = useState(false)
  const [wantKeys, setWantKeys] = useState(false)

  return (
    <div>
      <div className='form__row__two-columns'>
        <FormGroup
          name='properties'
          inputsSchema={[
            {
              name: 'name',
              type: 'string',
              label: 'Name',
            },
            {
              name: 'value',
              type: 'string',
              label: 'Value',
            },
          ]}
        />
        <FormGroup
          name='attributes'
          inputsSchema={[
            {
              name: 'trait_type',
              type: 'string',
              label: 'Trait type',
            },
            {
              name: 'value',
              type: 'string',
              label: 'Value',
            },
          ]}
        />
      </div>
      <div className='form__row__two-columns'>
        <div>
          <label htmlFor='null'>
            Are you want to add fees?
          </label>
          <input type='text' name='xd' />
          <button
            type='button'
            onClick={() => setWantFees(prev => !prev)}
          >
            Toogle
          </button>
          {wantFees && (
            <MinterWizardFees />
          )}
        </div>
        <div>
          <label htmlFor='null'>
            Are you want to add custom keys?
          </label>
          <button
            type='button'
            onClick={() => setWantKeys(prev => !prev)}
          >
            Toogle
          </button>
          {wantKeys && (
            <MinterWizardKeys />
          )}
        </div>
      </div>
      <button type='submit'>Mint</button>
    </div>
  );
}
