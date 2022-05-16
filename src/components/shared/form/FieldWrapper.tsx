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
  { name, label, fastField = false }: FieldWrapperProps,
  props: React.HTMLAttributes<HTMLInputElement>
) => {
  const Component = useMemo(() => (fastField ? FastField : Field), [fastField]);

  return (
    <>
      <label htmlFor={name}>{label}:</label>
      <Component id={name} name={name} {...props} />
      <Error name={name} />
    </>
  );
};

export default FieldWrapper;
