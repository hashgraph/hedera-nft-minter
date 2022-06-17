import { useField } from 'formik';
import React, { useRef, MouseEventHandler, useCallback, useMemo, useEffect } from 'react'
import classNames from 'classnames';

type Props = {
  value: string | number | boolean;
  label: string;
  name: string;
  image?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> ;
}

export default function FieldRadioButton({value, label, name, image, className, onClick} : Props) {
  const [field, , helpers] = useField(name);

  const labelRef = useRef<HTMLSpanElement | null>(null)

  const isActive = useMemo(() => (
    field.value === value
  ), [field.value, value])

  const handleOnClick = useCallback((e) => {
    if(onClick){
      onClick(e)
    }
    helpers.setValue(value)
  }, [helpers, value, onClick])

  useEffect(() => {
      if (labelRef.current) {
          labelRef.current.innerHTML = label;
      }
  }, [label, labelRef]);

  const classnames = classNames(className, {isActive, hasImage: !!image})


  return (
    <button type='button' className={classnames} onClick={handleOnClick}>
      {image && (
        <img src={image} alt='icon' />
      )}
      <span ref={labelRef} />
    </button>
  )
}
