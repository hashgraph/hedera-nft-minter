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

import React, { useEffect } from 'react';
import { FieldArray, useField, useFormikContext } from 'formik';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import each from 'lodash/each';
import omit from 'lodash/omit';

import FieldWrapper from '@components/shared/form/FieldWrapper';
import Tooltip from '@components/shared/form/Tooltip';
import { WizardValues } from '@utils/const/minter-wizard';

import thrashIcon from '@assets/images/icons/thrash.svg'
import plusIcon from '@assets/images/icons/plus.svg'

type Input = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

interface Props {
  inputsSchema: Input[];
  name: string;
  label: string;
}

const FormGroup = ({ inputsSchema, name, label, tooltip }: Props) => {
  const { setFieldTouched, validateField } = useFormikContext<WizardValues>()
  const [ field ] = useField(name)

  useEffect(() => {
    const newFieldIndex = field.value.length - 1

    each(inputsSchema, (el) => {
      if (newFieldIndex >= 0) {
        setFieldTouched(`${ name }.${ newFieldIndex }.${ el.name }`)
        validateField(`${ name }.${ newFieldIndex }.${ el.name }`)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value, validateField, setFieldTouched, name])

  return (
    <div className='form__group__row'>
      <FieldArray name={name}>
        {({ remove, push, form }) => (
          <>
            <div className='form__group__label__wrapper'>
              <div className='form__group__label'>
                <p className='title title--medium title--strong'>
                  {label}:
                </p>
                {tooltip && (
                  <Tooltip>
                    {tooltip}
                  </Tooltip>
                )}
              </div>

              <button
                type='button'
                className='form__group__button'
                onClick={() => push({
                  ...inputsSchema
                    .map(el => el.name && ({[el.name]:''}))
                    .reduce((prev, curr) => ({...prev, ...curr}))
                })}
              >
                <img width={15} height={15} src={plusIcon} alt='plus_icon' />
              </button>
            </div>
            {form.values[name].length <= 0 && (
              <div className='form__row'>
                <p>To add {name} click the button above.</p>
              </div>
            )}
            <TransitionGroup className='form__group__list'>
              {form.values[name].map((_: Input, index: number) => (
                <CSSTransition
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${ name }.${ index }.form__group__item`}
                  timeout={500}
                  classNames='form__group__item'
                >
                  <div className='form__group__inputs'>
                    {inputsSchema.map((input: Input, pairIndex: number) => (
                      <div
                        className='form__group__inputs__row'
                        // eslint-disable-next-line react/no-array-index-key
                        key={`form__group__inputs_row_${ index }.${ pairIndex }_${ name }.${ input.name }`}
                      >
                        <p className='label'>{ input.label }:</p>
                        <FieldWrapper
                          {...omit(input, ['label'])}
                          name={`${ name }.${ index }.${ input.name }`}
                        />
                      </div>
                    ))}

                    <div className='form__group__remove-button'>
                      <button className='form__group__button' type='button' onClick={() => remove(index)}>
                        <img width={13} height={16} src={thrashIcon} alt='thrash' />
                      </button>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default FormGroup;
