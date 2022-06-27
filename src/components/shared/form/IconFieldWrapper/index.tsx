import { Field } from 'formik';
import React from 'react';
import { JSX } from '@babel/types';
import './icon-field-wrapper.scss'

type Props = {
  type: string;
  name: string;
  icon: string | JSX.Element;
  isFormikField?: boolean;
  placeholder?: string;
}

export default function IconFieldWrapper({ type, name, icon, isFormikField = false, ...props }: Props) {

  return (
    <div className={'icon-field-wrapper'}>
      <div className='icon-field-wrapper__icon'>
        {icon}
      </div>
      {isFormikField ? (
        <Field
          type={type}
          name={name}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          {...props}
        />
      )}
    </div>
  );
}
