import React from 'react';
import { FastField, Field } from 'formik';
import Error from '@/components/shared/form/Error';

type LabelErrorFieldProps = React.HTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  type: string;
  fast_field?: boolean;
  max?: string | number;
};

const LabelErrorField = (
  { name, label, fast_field = false }: LabelErrorFieldProps,
  props: React.HTMLAttributes<HTMLInputElement>
) => {
  return (
    <>
      <label htmlFor={name}>{label}:</label>
      {fast_field ? (
        <FastField id={name} name={name} {...props} />
      ) : (
        <Field id={name} name={name} {...props} />
      )}
      <Error name={name} />
    </>
  );
};

export default LabelErrorField;
