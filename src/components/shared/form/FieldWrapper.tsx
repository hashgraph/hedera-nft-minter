import React, { InputHTMLAttributes, useCallback, useMemo } from 'react';
import { FastField, FieldAttributes, Field, useField } from 'formik';
import classNames from 'classnames';
import { JSX } from '@babel/types';

import Error from '@/components/shared/form/Error';
import Tooltip from './Tooltip';

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
      'form__field__container--textarea': props?.as === 'textarea'
    })
  ), [props?.as])

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
        ? maxLength
        : value.length
      ));
    }
    helpers.setTouched(true);
  }, [isArray, helpers, field?.value, type, maxLength])

  const handleBlur = useCallback((e) => {
    const value = e?.currentTarget.value;
    const slicedValue = value.slice(0, maxLength)

    if(props?.max) {
      helpers.setValue(Number.parseInt(slicedValue) > (props.max ?? 0) ? props.max : slicedValue)
    } else {
      helpers.setValue(slicedValue)
    }
  }, [helpers, maxLength, props?.max])

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

        {maxLength && (
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

        {props?.max && Number.parseInt(field?.value) > props.max && (
          <div className='form__error'>
            Max value of { props.max }
          </div>
        )}

        {!hideError && meta?.error && (
            <Error name={name} />
        )}
      </div>
    </div>
  );
};

export default FieldWrapper;
