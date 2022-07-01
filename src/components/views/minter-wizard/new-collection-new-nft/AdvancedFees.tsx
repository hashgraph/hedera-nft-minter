import React from 'react';
import Fees from '@/components/shared/minter-wizard/Fees';
import KeysTable from '@/components/shared/minter-wizard/KeysTable';
import { TOKEN_KEY } from '@utils/entity/TokenKeys';

export default function AdvancedFees() {
  return (
    <>
      <div className='form__row'>
        <KeysTable
          name='treasuryAccountId'
          label='Choose Treasury Account ID'
          data={[
            { title: 'Treasury Account ID', value: TOKEN_KEY.TREASURY, required: true }
          ]}
        />
      </div>
      <div className='form__row'>
        <Fees />
      </div>
    </>
  );
}
