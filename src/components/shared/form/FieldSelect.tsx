import React from 'react';
import { Field } from 'formik';

type Props = {
  children: React.ReactNode;
  name: string;
};

const FieldSelect = ({ name, children }: Props) => {
  return (
    <>
      <Field name={name} as='select'>
        {children}
      </Field>
      <div className='arrow' />
    </>
  );
};

export default FieldSelect;
