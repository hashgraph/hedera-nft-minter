import React from 'react';
import { Field } from 'formik';
import Error from '@/components/shared/form/Error';

type Props = {
  children: React.ReactNode;
  name: string;
};

const FieldSelect = ({ name, children }: Props) => {
  return (
    <div className='form__select_row'>
      <Field name={name} as='select'>
        {children}
      </Field>
      <div className='arrow' />
      <Error name={name} />
    </div>
  );
};

export default FieldSelect;
