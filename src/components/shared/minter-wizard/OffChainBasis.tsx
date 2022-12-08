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

import React, {useMemo} from 'react';
import { FormikValues, useField, useFormikContext } from 'formik';
import FieldWrapper from '@components/shared/form/FieldWrapper';
import DragAndDropFileInput from '@components/shared/form/DragAndDropFileInput';
import Error from '@components/shared/form/Error';
import { MintTypes } from '@utils/entity/MinterWizard';
import useHederaWallets from '@src/utils/hooks/useHederaWallets';
import { NO_COLLECTIONS_FOUND_MESSAGE } from './SelectCollection';

export default function OffChainBasis() {
  const [field] = useField('mint_type');
  const { values } = useFormikContext<FormikValues>()
  const { userWalletId } = useHederaWallets();

  const disabledCollectionInfo = useMemo(() =>
    field.value === MintTypes.ExistingCollectionNewNFT,
  [field.value])

  const showDisabledCollectionInfoFieldAsError = useMemo(() => (
    disabledCollectionInfo && (
      !userWalletId ||
      (!!userWalletId && values.name == NO_COLLECTIONS_FOUND_MESSAGE && values.symbol === NO_COLLECTIONS_FOUND_MESSAGE)
    )
  ), [disabledCollectionInfo, userWalletId, values.name, values.symbol])

  return (
    <div className='minter-wizard__off-chain'>
      <p className='title--medium title--strong'>General information:</p>
      <div className='minter-wizard__off-chain__form'>
        <div className='form__row'>
          <DragAndDropFileInput name='image' />
          <div className='form__error_wrapper'>
            <Error name='image' />
          </div>
        </div>
        <div className='form__row'>
          <div>
            <FieldWrapper
              fastField
              name='name'
              type='text'
              placeholder='Collection name'
              maxLength={100}
              showAsError={showDisabledCollectionInfoFieldAsError}
              disabled={disabledCollectionInfo}
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='symbol'
              type='text'
              placeholder='Collection symbol'
              maxLength={100}
              showAsError={showDisabledCollectionInfoFieldAsError}
              disabled={disabledCollectionInfo}
            />
          </div>
          <div className='mb-1'>
            <FieldWrapper
              fastField
              name='edition_name'
              type='text'
              placeholder='NFT name'
              maxLength={100}
            />
          </div>
          <div>
            <FieldWrapper
              fastField
              name='description'
              as='textarea'
              type='text'
              placeholder='NFT description'
              maxLength={1000}
            />
          </div>
          <div className='form__row'>
            <div>
              <FieldWrapper
                fastField
                name='creator'
                type='text'
                placeholder='NFT creator'
                maxLength={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
