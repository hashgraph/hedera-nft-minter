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

import { SelectHTMLAttributes, useMemo } from 'react';
import { FastField, Field, FieldAttributes, useField } from 'formik';
import classNames from 'classnames';
import Error from '@components/shared/form/Error';
import { DownOutlined } from '@ant-design/icons';

type FieldWrapperProps = FieldAttributes<SelectHTMLAttributes<HTMLSelectElement>> & {
  name: string;
  label?: string;
  fastField?: boolean;
  max?: string | number;
  hideError?: boolean,
};

const FieldSelect = ({
  name,
  label,
  fastField = false,
  hideError = false,
  children,
  ...restProps
}: FieldWrapperProps) => {
  const Component = useMemo(() => (fastField ? FastField : Field), [fastField]);
  const [, meta] = useField(name)

  const shouldBeErrorDisplayed = useMemo(() => (
    meta.touched && meta.error
  ), [meta.error, meta.touched])

  const selectClassName = useMemo(() => (
    classNames('form__row', 'form__select', {
      'form__field__container--error': shouldBeErrorDisplayed
    })
  ), [shouldBeErrorDisplayed])

  return (
    <div className={selectClassName}>
      {Boolean(label) && <label htmlFor={name}>{label}:</label>}
      <div className='select__component'>
        <Component name={name} as='select' {...restProps}>
          {children}
        </Component>
        <DownOutlined className='arrow' />
      </div>
      {!hideError && (
        <Error name={name} />
      )}
    </div>
  );
};

export default FieldSelect;
