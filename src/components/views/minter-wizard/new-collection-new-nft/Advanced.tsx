import React from 'react';
import MinterWizardFees from '@/components/shared/minter-wizard/minter-wizard-fees';
import MinterWizardKeys from '@/components/shared/minter-wizard/minter-wizard-keys';

export default function Advanced() {


  return (
    <div>
      <div className='form__row'>
        <MinterWizardFees />
      </div>
      <div className='form__row'>
        <MinterWizardKeys />
      </div>
    </div>
  );
}
