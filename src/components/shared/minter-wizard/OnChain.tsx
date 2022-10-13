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

import React, { useMemo } from 'react';
import FieldWrapper from '@components/shared/form/FieldWrapper';
import { useField } from 'formik';

export default function OnChain() {
  const [field] = useField('maxSupply')

  const maxQtyValue = useMemo(() => {
    const maxQty = parseInt(field.value ?? '0')

    return (maxQty >= 10 || maxQty <= 0) ? 10 : maxQty
  }, [field.value])

  return (
    <div className='minter-wizard__on-chain'>
      <div>
        <p className='title title--small'>
          How many NFTs do you want
          to mint in your new collection?
        </p>
      </div>
      <div className='minter-wizard__on-chain__wrapper'>
        <div className='minter-wizard__on-chain__input-row'>
          <label htmlFor='maxSupply' className='title--strong title--medium'>
            # of <br />
            NFTs to <br />
            mint now:
          </label>
          <FieldWrapper
            fastField
            name='qty'
            type='number'
            tooltip='This is the number of NFTs to mint right now.
              You can mint 10 at a time until you reach the
              maximum number of NFTs. All NFTs created will
              share the same image and metadata properties.'
            min='1'
            max={maxQtyValue}
            maxLength={2}
            hideCharLimit
          />
        </div>
        <div className='minter-wizard__on-chain__input-row'>
          <label htmlFor='qty' className='title--strong title--medium'>
            Maximum <br />
            Total Supply:
          </label>
          <FieldWrapper
            fastField
            name='maxSupply'
            type='number'
            maxLength={6}
            tooltip={
              <>
                This is the maximum number of NFTs which can be minted into the collection.
                <span className='flex'>This amount CANNOT be changed in the future</span>
              </>
            }
            min='1'
          />
        </div>
      </div>
    </div>
  );
}
