import { Field } from 'formik';
import React, { useCallback, useState } from 'react';
import { JSX } from '@babel/types';
import classNames from 'classnames';
import './icon-field-wrapper.scss'

type Props = {
  type: string;
  name: string;
  icon: string | JSX.Element;
}

export default function IconFieldWrapper({type, name, icon, ...props} : Props) {
  const [isElementFocused, setIsElementFocused] = useState(false)

  const handleFocus = useCallback(() => {
    setIsElementFocused(true)
  }, [setIsElementFocused])

  const handleBlur = useCallback(() => {
    setIsElementFocused(false)
  }, [setIsElementFocused])

  const iconFieldWrapperClassName = classNames('icon-field-wrapper', {
    'is-focused': isElementFocused
  })

  return (
  <div className={iconFieldWrapperClassName}>
    <div className='icon-field-wrapper__icon'>
      {icon}
    </div>
    <Field
      onFocus={handleFocus}
      onBlur={handleBlur}
      type={type}
      name={name}
      placeholder={'e.g. 0.005'}
      {...props}
    />
  </div>
  );
}
