import { JSX } from '@babel/types';
import { FieldAttributes, useField } from 'formik';
import { ButtonHTMLAttributes } from 'react';

interface Option {
  label: string | JSX.Element,
  value: string | number,
}

type ButtonGroupProps = FieldAttributes<ButtonHTMLAttributes<HTMLButtonElement>> & {
  name: string,
  options: Option[]
}

export default function ButtonGroup({
  name,
  options,
}: ButtonGroupProps) {
  const [,, helpers] = useField(name);

  return (
    <div className='form__row form__buttons'>
      {options.map(({ label, value }: Option) => (
        <button key={value} type='button' onClick={() => helpers.setValue(value)}>
          {label}
        </button>
      ))}
    </div>
  )
}
