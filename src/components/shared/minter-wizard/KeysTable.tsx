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
import { Field, useField } from 'formik';
import classNames from 'classnames';
import map from 'lodash/map';

import { TOKEN_KEY } from '@utils/entity/TokenKeys';

import Tooltip from '@components/shared/form/Tooltip';

export const TokenKeys = [
  { title: 'Treasury Account ID', value: TOKEN_KEY.TREASURY, required: true },
  { title: 'Supply', value: TOKEN_KEY.SUPPLY, required: true },
  { title: 'Admin', value: TOKEN_KEY.ADMIN },
  { title: 'Freeze', value: TOKEN_KEY.FREEZE },
  { title: 'Wipe', value: TOKEN_KEY.WIPE },
  { title: 'Pause', value: TOKEN_KEY.PAUSE },
  { title: 'Pause', value: TOKEN_KEY.PAUSE },
  { title: 'Fee Schedule', value: TOKEN_KEY.FEE_SCHEDULE },
]

export type MinterWizardKey = {
    title: string;
    value: TOKEN_KEY;
    required?: boolean;
    tooltip?: string,
}

export interface MinterWizardKeysProps {
  data: MinterWizardKey[],
  label: string,
  name: string,
}

const MinterWizardKeys = ({ data, name }: MinterWizardKeysProps) => {
  const [field] = useField<TOKEN_KEY[]>(name);

  return (
    <>
      <p className='title--medium title--strong'>Keys:</p>
      <div role='group' aria-labelledby='checkbox-group-keys' className='minter-wizard__keys'>
        {map(data, (el) => (
          <div key={el.value} className='minter-wizard__keys__checkbox'>
            <div className='title'>
              {el.title}
              {el?.tooltip && (
                <Tooltip >
                  {el.tooltip}
                </Tooltip>
              )}
            </div>

            <label className=''>
              <span
                className={classNames('minter-wizard__keys__pseudo-checkbox', {
                  'required': el.required,
                  'minter-wizard__keys__pseudo-checkbox--active': el.required ?? field.value.includes(el.value)
                })}
              />
              {el.required ? (
                  <input type='checkbox' checked={true} onChange={() => null}/>
                ) : (
                  <Field type='checkbox' name='keys' value={el.value} />
                )
              }
            </label>
          </div>
        ))}
      </div>
    </>
  )
}


export default MinterWizardKeys;
