import { JSX } from '@babel/types';
import { FieldAttributes } from 'formik';
import { ButtonHTMLAttributes } from 'react';
import FieldRadioButton from '../field-radio-button';

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

  return (
    <div className='form__row form__buttons'>
      {options.map(({ label, value }: Option) => (
        <FieldRadioButton
          key={value}
          value={value}
          label={label}
          name={name}
        />
      ))}
    </div>
  )
}
