import React from 'react';
import { ErrorMessage } from 'formik';
import classNames from 'classnames';
type Props = {
  name: string;
  className?: string;
  onClick?: () => void;
};

const Error = ({ name, className, onClick }: Props) => {

  const classname = classNames('form__error', className, {
    image_error: name === 'image',
    hover: typeof onClick === 'function'
  });

  return (
    <div className={classname} onClick={onClick}>
      <ErrorMessage name={name} />
    </div>
  );
};

export default Error;
