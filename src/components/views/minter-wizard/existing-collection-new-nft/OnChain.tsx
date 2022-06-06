import React from 'react';
import FieldWrapper from '@/components/shared/form/FieldWrapper';

export default function OnChain() {
  return (
    <div className='form__row__two-columns-flex'>
      <div>
        <FieldWrapper
          fastField
          name='qty'
          type='number'
          label='How many tokens you want to mint now?'
          max='10'
        />
      </div>
    </div>
  );
}
