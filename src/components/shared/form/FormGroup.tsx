import React, { useEffect } from 'react';
import { FieldArray, useField, useFormikContext } from 'formik';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import FieldWrapper from '@/components/shared/form/FieldWrapper';
import each from 'lodash/each';
import { WizardValues } from '@/utils/const/minter-wizard';

type Input = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

interface Props {
  inputsSchema: Input[];
  name: string;
  label: string;
}

const FormGroup = ({ inputsSchema, name, label }: Props) => {
  const { setFieldTouched, validateField } = useFormikContext<WizardValues>()
  const [ field ] = useField(name)

  useEffect(() => {
    const newFieldIndex = field.value.length - 1
    each(inputsSchema, (el) => {
      if(newFieldIndex >= 0){
        setFieldTouched(`${ name }.${ newFieldIndex }.${ el.name }`)
        validateField(`${ name }.${ newFieldIndex }.${ el.name }`)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value, validateField, setFieldTouched, name])

  return (
    <div className='form__group-row'>
      <FieldArray name={name}>
        {({ remove, push, form }) => (
          <>
            <div className='form__group__label-wrapper'>
              <label htmlFor='null'>
                {label}:
              </label>
              <button
                type='button'
                className='btn--big'
                onClick={() => push({ ...Object.keys(inputsSchema[0]).map(el => el && ({[el] : ''})) })}
              >
                Add
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
                        <FieldWrapper
                          {...input}
                          name={`${ name }.${ index }.${ input.name }`}
                        />
                      </div>
                    ))}

                    <div className='form__group__table__row__remove-button'>
                      <button className='btn--big' type='button' onClick={() => remove(index)}>
                        Del
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
