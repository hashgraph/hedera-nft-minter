import classNames from 'classnames';
import { FieldAttributes } from 'formik';
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { JSX } from '@babel/types'
import FieldRadioButton from '../FieldRadioButton';

interface Option {
  label: string | JSX.Element,
  value: string | number,
  image?: string,
  onClick?: MouseEventHandler<HTMLButtonElement> ;
}

type ButtonGroupProps = FieldAttributes<ButtonHTMLAttributes<HTMLButtonElement>> & {
  name: string,
  options: Option[],
  size?: 'big' | 'md';
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
      className={classNames('form__row form__buttons', { square })}
    >
      {options.map(({ label, value, image, onClick }: Option) => (
        <FieldRadioButton
          className={classNames('button-group', {
            big: size === 'big',
            medium: size === 'md',
            square
          })}
          image={image}
          key={value}
          value={value}
          label={label}
          name={name}
          onClick={onClick}
        />
      ))}
    </div>
  )
}
