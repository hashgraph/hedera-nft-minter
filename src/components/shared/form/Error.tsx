import React from 'react';
import { ErrorMessage } from 'formik';

type Props = {
  name: string;
};

const Error = ({ name }: Props) => {
  let className = 'form__error';
  if (name === 'image') className += ' image_error';
  return (
    <ErrorMessage name={name}>
      {(msg) => <div className={className}>{msg}</div>}
    </ErrorMessage>
  );
};

export default Error;
