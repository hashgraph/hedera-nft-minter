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
      'btn__group--active': isActive,
      hasImage: !!image,
    }
  ), [className, isActive, image]);

  const handleOnClick = useCallback((e) => {
    if (onClick) {
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
      <span className='btn__group--icon' />
    </button>
  )
}
