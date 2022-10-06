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

import { Field } from 'formik';
import React from 'react';
import { JSX } from '@babel/types';
import './icon-field-wrapper.scss'

type Props = {
  type: string;
  name: string;
  icon: string | JSX.Element;
  isFormikField?: boolean;
  placeholder?: string;
}

export default function IconFieldWrapper({ type, name, icon, isFormikField = false, ...props }: Props) {

  return (
    <div className={'icon-field-wrapper'}>
      <div className='icon-field-wrapper__icon'>
        {icon}
      </div>
      {isFormikField ? (
        <Field
          type={type}
          name={name}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          {...props}
        />
      )}
    </div>
  );
}
