import React from 'react';
import FieldWrapper from '@/components/shared/form/FieldWrapper';

export default function OnChain() {
  return (
    <>
      <div>
        <h3 className='offchain-basis-header'>
          How many tokens do you want in your collection?
        </h3>
        <p className='form__text'>
          Remember, <i><u>max-supply</u></i> field can’t be changed later.
        </p>
      </div>
      <div className='form__row__two-columns'>
        <div className='form__row__two-columns'>
          <FieldWrapper
            fastField
            name='maxSupply'
            type='number'
            label='# max supply'
            min='0'
          />
          <FieldWrapper
            fastField
            name='qty'
            type='number'
            label='Quantity of tokens'
            tooltip='You can mint a maximum of 10 tokens at once.'
            max='10'
            min='0'
          />
        </div>
      </div>
    </>
  );
}
