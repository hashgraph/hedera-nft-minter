import React, { InputHTMLAttributes, useCallback, useMemo } from 'react';
import { FastField, FieldAttributes, Field, useField } from 'formik';
import classNames from 'classnames';
import { JSX } from '@babel/types';

import Error from '@/components/shared/form/Error';
import Tooltip from './Tooltip';

const MAX_NUMBER_INPUT_LENGTH = 6

type FieldWrapperProps = FieldAttributes<InputHTMLAttributes<HTMLInputElement>> & {
  name: string,
  label?: string,
  fastField?: boolean,
  max?: string | number,
  hideError?: boolean,
  inverse?: boolean,
  isArray?: boolean,
  onEnter?: () => void,
  tooltip?: string | JSX.Element,
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
  maxLength,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  onEnter = () => {},
  ...props
}: FieldWrapperProps) => {
  const id = useMemo(() => Math.random().toString(), []);
  const [field, meta, helpers] = useField(name);
  const Component = useMemo(() => (fastField ? FastField : Field), [fastField]);
  const wrapperClassName = classNames(
    'form__row',
    `form__${ type }`,
    { inverse },
  );

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

      helpers.setValue(value.slice(0, type === 'number'
        ? MAX_NUMBER_INPUT_LENGTH
        : value.length
      ));
    }
    helpers.setTouched(true);
  }, [isArray, helpers, field.value, type])

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
      <div className='form__field__container'>
        <Component
          id={id}
          name={name}
          {...props}
          maxLength={maxLength}
          type={type}
          checked={isArray ? (field.value || []).includes(props.value) : props.value === field.value}
          onKeyDown={({ key }: KeyboardEvent) => key === 'Enter' ? onEnter() : null}
          onChange={['radio', 'checkbox', 'number'].includes(type) ? handleChange : field.onChange}
        />

        {maxLength && (
          <span className='max-length'>
            {field.value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
      <div className='form__errors'>
        {maxLength && field.value?.length === maxLength && (
          <div className='form__warning'>
              Max length reached!
          </div>
        )}

        {!hideError && meta.error && (
          <Error name={name} />
        )}
      </div>
    </div>
  );
};

export default FieldWrapper;
