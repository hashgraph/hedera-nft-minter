import React from 'react';
import Fees from '@/components/shared/minter-wizard/Fees';
import Keys from '@/components/shared/minter-wizard/Keys';

export default function Advanced() {


  return (
    <div>
      <div className='form__row'>
        <Fees />
      </div>
      <div className='form__row'>
        <Keys />
      </div>
    </div>
  );
}
