import React from 'react';
import Fees from '@/components/shared/minter-wizard/Fees';


export default function AdvancedFees() {
  return (
    <div className='minter-wizard__fees'>
      <div className='form__row'>
        <Fees />
      </div>
    </div>
  );
}
