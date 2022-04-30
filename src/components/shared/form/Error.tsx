import React from 'react';
import { ErrorMessage } from 'formik';

type Props = {
  name: string;
};

const Error = ({ name }: Props) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => <div className='form__error'>{msg}</div>}
    </ErrorMessage>
  );
};

export default Error;
