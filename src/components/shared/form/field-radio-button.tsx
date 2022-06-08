import { useField } from 'formik';
import React, { useCallback, useMemo } from 'react'
import { JSX } from '@babel/types';
import classNames from 'classnames';

type Props = {
  value: string | number | boolean;
  label: string | JSX.Element;
  name: string;
  image?: string;
  className?: string;
}

export default function FieldRadioButton({value, label, name, image, className} : Props) {
  const [field, , helpers] = useField(name);

  const isActive = useMemo(() =>
    field.value === value
  ,[field.value, value])

  const handleOnClick = useCallback(() =>
    helpers.setValue(value)
  ,[helpers, value])

  const classnames = classNames(className, {isActive, hasImage: !!image})

  return (
    <button type='button' className={classnames} onClick={handleOnClick}>
      {image && (
        <img src={image} alt='icon' />
      )}
      {label}
    </button>
  )
}
