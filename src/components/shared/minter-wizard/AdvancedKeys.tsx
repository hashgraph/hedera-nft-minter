import React from 'react';
import KeysTable from '@/components/shared/minter-wizard/KeysTable';
import { TOKEN_KEY } from '@utils/entity/TokenKeys';

export default function Advanced() {

  return (
    <div>
      <div className='form__row'>
        <KeysTable
          label='Collection keys'
          name='keys'
          data={[
            { title: 'Supply', value: TOKEN_KEY.SUPPLY, required: true },
            { title: 'Admin', value: TOKEN_KEY.ADMIN },
            { title: 'Freeze', value: TOKEN_KEY.FREEZE },
            { title: 'Wipe', value: TOKEN_KEY.WIPE },
            { title: 'Pause', value: TOKEN_KEY.PAUSE },
          ]}
        />
      </div>
    </div>
  );
}
