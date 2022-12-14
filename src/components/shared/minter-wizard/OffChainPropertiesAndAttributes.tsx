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
import FormGroup from '@components/shared/form/FormGroup';

export default function OffChainPropertiesAndAttributes() {
  return (
    <div>
      <div className='form__row'>
        <FormGroup
          name='attributes'
          label='Attributes'
          tooltip='Attributes describe elements of an NFT which are used to determine
            its rarity. Common attributes include background color, eyes, fur, hat mouth and more.'
          inputsSchema={[
            {
              name: 'trait_type',
              type: 'text',
              label: 'Trait type',
              placeholder: 'e.g color',
              maxLength: 100
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              placeholder: 'e.g blue',
              maxLength: 100
            },
          ]}
        />
      </div>
      <div className='form__row'>
        <FormGroup
          name='properties'
          label='Properties'
          tooltip='Properties describe non-rarity elements which relate to the NFT such as website,
            license type, social media handles and more.'
          inputsSchema={[
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              placeholder: 'e.g website',
              maxLength: 100
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              placeholder: 'e.g www.mysite.com',
              maxLength: 100
            },
          ]}
        />
      </div>
    </div>
  );
}
