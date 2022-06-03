import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { WizardValues } from '@/utils/const/minter-wizard';
import FormGroup from '@/components/shared/form/FormGroup';
import MinterWizardFees from '@/components/shared/minter-wizard/minter-wizard-fees';
import MinterWizardKeys from '@/components/shared/minter-wizard/minter-wizard-keys';

export default function Advenced() {
  const { values } = useFormikContext<WizardValues>()
  const [wantFees, setWantFees] = useState(false)
  const [wantKeys, setWantKeys] = useState(false)


  return (
    <div>
      <div className='form__row__two-columns'>
        <FormGroup
          name='properties'
          values={values.properties.map(() => [
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
          ])}
        />
        <FormGroup
          name='attributes'
          values={values?.attributes?.map(() => [
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
          ])}
        />
      </div>
      <div className='form__row__two-columns'>
        <div>
          <label htmlFor='null'>
            Are you want to add fees?
          </label>
          <button
            type='button'
            onClick={() => setWantFees(prev => !prev)}
          >
            Toogle
          </button>
          {
            wantFees &&
            <MinterWizardFees />
          }
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
          {
            wantKeys &&
            <MinterWizardKeys />
          }
        </div>
      </div>
      <button type='submit'>Mint</button>
    </div>
  );
}
