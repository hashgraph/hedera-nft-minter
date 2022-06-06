import React from 'react';
import {  useFormikContext } from 'formik';
import { WizardValues } from '@/utils/const/minter-wizard';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import ButtonGroup from '@/components/shared/form/button-group';

export default function OnChain() {
  const { values } = useFormikContext<WizardValues>()

  return (
    <div>
      <ButtonGroup
        name='is_multiple_mint'
        options={[
          {
            label: 'Create collection with multiplie copies of NFT',
            value: 'true'
          },
          {
            label: 'Create collection with single NFT',
            value: 'false'
          },
        ]}
      />

      <div className='form__row__two-columns-flex'>
        <div>
          {values.is_multiple_mint === 'true' &&
            <FieldWrapper
              fastField
              name='qty'
              type='number'
              label='Qty of tokens'
              max='10'
            />
          }
        </div>
        <div>
          <FieldWrapper
            fastField
            name='maxSupply'
            type='number'
            label='# max supply'
          />
        </div>
      </div>
    </div>
  );
}
