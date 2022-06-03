import React, { InputHTMLAttributes, useMemo } from 'react';
import { FastField, FieldAttributes, Field } from 'formik';
import classNames from 'classnames';

import Error from '@/components/shared/form/Error';

type FieldWrapperProps = FieldAttributes<InputHTMLAttributes<HTMLInputElement>> & {
  name: string,
  label?: string,
  fastField?: boolean,
  max?: string | number,
  hideError?: boolean,
  inverse?: boolean,
};

const FieldWrapper = ({
  name,
  label,
  fastField = false,
  hideError = false,
  inverse = false,
  type = 'text',
  ...props
}: FieldWrapperProps) => {
  const id = useMemo(() => Math.random().toString(), []);
  const Component = useMemo(() => (fastField ? FastField : Field), [fastField]);
  const wrapperClassName = classNames(
    'form__row',
    `form__${ type }`,
    { inverse },
  );

  return (
    <div className={wrapperClassName}>
      {Boolean(label) && <label htmlFor={id}>{label}:</label>}
      <Component id={id} name={name} type={type} {...props} />
      {!hideError && (
        <Error name={name} />
      )}
    </div>
  );
};

export default FieldWrapper;
