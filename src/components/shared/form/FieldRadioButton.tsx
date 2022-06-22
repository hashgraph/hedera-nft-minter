import { useField } from 'formik';
import React, { MouseEventHandler, useCallback, useMemo } from 'react'
import classNames from 'classnames';
import { JSX } from '@babel/types'

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

  const isActive = useMemo(() => (
    field.value === value
  ), [field.value, value]);

  const classnames = useMemo(() => classNames(
    className,
    {
      isActive,
      hasImage: !!image,
    }
  ), [className, isActive, image]);

  const handleOnClick = useCallback((e) => {
    if(onClick){
      onClick(e)
    }
    helpers.setValue(value)
  }, [helpers, value, onClick])

  return (
    <button type='button' className={classnames} onClick={handleOnClick}>
      {image && (
        <img src={image} alt='icon' />
      )}
      <span>
        {label}
      </span>
    </button>
  )
}