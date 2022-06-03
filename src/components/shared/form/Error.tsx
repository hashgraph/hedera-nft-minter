import React from 'react';
import { ErrorMessage } from 'formik';
import classNames from 'classnames';
type Props = {
  name: string;
};

const Error = ({ name }: Props) => {
  const className = classNames('form__error', {
    image_error: name === 'image',
  });

  return (
    <div className={className}>
      <ErrorMessage name={name} />
    </div>
  );
};

export default Error;
