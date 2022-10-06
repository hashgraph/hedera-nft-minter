/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import classNames from 'classnames';
import { FieldAttributes } from 'formik';
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { JSX } from '@babel/types'
import FieldRadioButton from '../FieldRadioButton';

interface Option {
  label: string | JSX.Element,
  tooltip?: string | JSX.Element,
  renderArrow?: boolean;
  value: string | number,
  image?: string,
  onClick?: MouseEventHandler<HTMLButtonElement> ;
}

type ButtonGroupProps = FieldAttributes<ButtonHTMLAttributes<HTMLButtonElement>> & {
  name: string,
  options: Option[],
  size?: 'big' | 'md';
  square?: boolean;
  direction?: 'row' | 'column'
}

export default function ButtonGroup({
  name,
  options,
  size = undefined,
  square = false,
  direction = 'row'
}: ButtonGroupProps) {

  return (
    <div
      className={classNames('form__row form__buttons', {
        square,
        [`form__buttons--${ direction }`]: !!direction
      })}
    >
      {options.map(({ label, value, image, onClick }: Option) => (
        <FieldRadioButton
          className={classNames('btn__group', {
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
