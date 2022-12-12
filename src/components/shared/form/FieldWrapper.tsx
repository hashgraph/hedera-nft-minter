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

import React, { InputHTMLAttributes, useCallback, useMemo } from 'react';
import { FastField, FieldAttributes, Field, useField } from 'formik';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { JSX } from '@babel/types';

import Error from '@components/shared/form/Error';
import Tooltip from './Tooltip';

type FieldWrapperProps = FieldAttributes<InputHTMLAttributes<HTMLInputElement>> & {
  name: string,
  label?: string,
  fastField?: boolean,
  max?: string | number,
  hideError?: boolean,
  inverse?: boolean,
  isArray?: boolean,
  showAsError?: boolean,
  onEnter?: () => void,
  tooltip?: string | JSX.Element,
  hideCharLimit?: boolean,
};

const FieldWrapper = ({
  name,
  label,
  tooltip,
  fastField = false,
  hideError = false,
  inverse = false,
  type = 'text',
  isArray = false,
  showAsError = false,
  maxLength,
  hideCharLimit,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  onEnter = () => {},
  ...props
}: FieldWrapperProps) => {
  const id = useMemo(() => uuidv4(), []);
  const [field, meta, helpers] = useField(name);
  const Component = useMemo(() => (fastField ? FastField : Field), [fastField]);

  const shouldBeErrorDisplayed = useMemo(() => (
    showAsError || meta.touched && meta.error
  ), [showAsError, meta.error, meta.touched])

  const wrapperClassName = useMemo(() => (
    classNames(
      'form__row',
      `form__${ type }`,
      { inverse },
    )
  ), [inverse, type]);

  const formFieldContainerClassName = useMemo(() => (
    classNames('form__field__container', {
      'input': props?.as === 'textarea',
      'form__field__container--textarea': props?.as === 'textarea',
      'form__field__container--error': shouldBeErrorDisplayed
    })
  ), [props?.as, shouldBeErrorDisplayed])

  const handleChange = useCallback((e) => {
    if (isArray) {
      const value = e.currentTarget.value;
      const currentValue = field.value || [];

      if (currentValue.includes(value)) {
        const newValue = field.value.filter((v: string) => v !== value);

        helpers.setValue(newValue);
      } else {
        helpers.setValue([...currentValue, value]);
      }
    } else {
      const value = e.currentTarget.value;

      helpers.setTouched(true, false)

      if (type === 'number') {
        helpers.setValue(value.slice(0, maxLength), true);
      } else {
        helpers.setValue(value, true);
      }
    }
  }, [isArray, helpers, field.value, type, maxLength])

  const handleBlur = useCallback((e) => {
    const value = e?.currentTarget.value;
    const slicedValue = value.slice(0, maxLength)

    if (props?.min && Number.parseInt(slicedValue) <= 0) {
      return helpers.setValue(props.min)
    }

    if (Number.parseInt(slicedValue) >= (props.max ?? 0) && props?.max) {
      return helpers.setValue(props.max)
    }

    helpers.setValue(slicedValue)
  }, [helpers, maxLength, props.max, props.min])

  return (
    <div className={wrapperClassName}>
      {Boolean(label) && (
        <label htmlFor={id}>
          {label}:
          {tooltip && (
            <Tooltip>
              {tooltip}
            </Tooltip>
          )}
        </label>
      )}
      <div className={formFieldContainerClassName}>
        <Component
          id={id}
          name={name}
          {...props}
          maxLength={maxLength}
          type={type}
          checked={isArray ? (field.value || []).includes(props.value) : props.value === field.value}
          onKeyDown={({ key }: KeyboardEvent) => key === 'Enter' ? onEnter() : null}
          onChange={['radio', 'checkbox', 'number'].includes(type) ? handleChange : field.onChange}
          onBlur={['number'].includes(type) ? handleBlur : field.onBlur}
        />

        {maxLength && !hideCharLimit && (
          <span className='max-length'>
            {field?.value?.toString()?.length || 0}/{maxLength}
          </span>
        )}
      </div>

      <div className='form__errors'>
        {!props?.max && maxLength && field?.value?.length === maxLength && (
          <div className='form__warning'>
            Max length reached
          </div>
        )}

        {!hideError && (
          <Error name={name} />
        )}
      </div>
    </div>
  );
};

export default FieldWrapper;
