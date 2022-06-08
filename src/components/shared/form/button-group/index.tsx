import { JSX } from '@babel/types';
import classNames from 'classnames';
import { FieldAttributes } from 'formik';
import { ButtonHTMLAttributes } from 'react';
import FieldRadioButton from '../field-radio-button';

interface Option {
  label: string | JSX.Element,
  value: string | number,
  image?: string,
}

type ButtonGroupProps = FieldAttributes<ButtonHTMLAttributes<HTMLButtonElement>> & {
  name: string,
  options: Option[],
  size?: 'big' | 'md' ;
  square?: boolean;
}

export default function ButtonGroup({
  name,
  options,
  size = undefined,
  square = false,
}: ButtonGroupProps) {

  return (
    <div
      className={classNames('form__row form__buttons', {
        big: size === 'big',
        medium: size === 'md',
        square
      })}
    >
      {options.map(({ label, value, image }: Option) => (
        <FieldRadioButton
          image={image}
          key={value}
          value={value}
          label={label}
          name={name}
        />
      ))}
    </div>
  )
}
