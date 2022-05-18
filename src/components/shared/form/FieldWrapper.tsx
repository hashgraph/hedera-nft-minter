import React, { useMemo } from 'react';
import { FastField, Field } from 'formik';
import Error from '@/components/shared/form/Error';

type FieldWrapperProps = React.HTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  type: string;
  fastField?: boolean;
  max?: string | number;
};

const FieldWrapper = (
  { name, label, type, fastField = false }: FieldWrapperProps,
  props: React.HTMLAttributes<HTMLInputElement>
) => {
  const Component = useMemo(() => (fastField ? FastField : Field), [fastField]);

  return (
    <>
      <label htmlFor={name}>{label}:</label>
      <Component id={name} name={name} type={type} {...props} />
      <div className='form__error_wrapper'>
        <Error name={name} />
      </div>
    </>
  );
};

export default FieldWrapper;
