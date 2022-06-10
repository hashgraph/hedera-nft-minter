import { useField } from 'formik';
import React, { MouseEventHandler, useCallback, useMemo } from 'react'
import { JSX } from '@babel/types';
import classNames from 'classnames';

type Props = {
  value: string | number | boolean;
  label: string | JSX.Element;
  name: string;
  image?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> ;
}

export default function FieldRadioButton({value, label, name, image, className, onClick} : Props) {
  const [field, , helpers] = useField(name);

  const isActive = useMemo(() =>
    field.value === value
  ,[field.value, value])

  const handleOnClick = useCallback((e) => {
    if(onClick){
      onClick(e)
    }
    helpers.setValue(value)
  },[helpers, value, onClick])

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
