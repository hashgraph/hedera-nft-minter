/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React from 'react';
import KeysTable from '@components/shared/minter-wizard/KeysTable';
import { TOKEN_KEY } from '@utils/entity/TokenKeys';

export default function Advanced() {

  return (
    <div>
      <div className='form__row'>
        <KeysTable
          label='Collection keys'
          name='keys'
          data={[
            {
              title: 'Supply',
              value: TOKEN_KEY.SUPPLY,
              required: true,
              tooltip: 'The SUPPLY key can change the total supply of an NFT within a Collection and must be set to mint additional NFTs.'
            },
            {
              title: 'Admin',
              value: TOKEN_KEY.ADMIN,
              tooltip: 'The ADMIN key can be used to delete an entire NFT Collection.'
            },
            {
              title: 'Freeze',
              value: TOKEN_KEY.FREEZE,
              tooltip: 'The FREEZE key can be used to freeze an account for NFT transfers.'
            },
            {
              title: 'Wipe',
              value: TOKEN_KEY.WIPE,
              tooltip: 'The WIPE key can be used to delete all NFTs within that Collection for a specific account.'
            },
            {
              title: 'Pause',
              value: TOKEN_KEY.PAUSE,
              tooltip: 'The PAUSE key that has the authority to pause or unpause an NFT Collection. Pausing an NFT Collection prevents all transfers of the NFTs within the Collection.'
            },
            {
              title: 'Fee Schedule',
              value: TOKEN_KEY.FEE_SCHEDULE,
              tooltip: 'The Fee Schedule key has the ability to change the Collection’s royalty fees after it has been minted. Changing the royalty fees of a Collection will impact all NFTs within the Collection (fixed, royalty and fallback).'
            },
          ]}
        />
      </div>
    </div>
  );
}
