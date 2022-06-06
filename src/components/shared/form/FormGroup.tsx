import React from 'react';
import { FieldArray } from 'formik';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import FieldWrapper from '@/components/shared/form/FieldWrapper';

type Input = {
  label: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Props {
  inputsSchema: [Input, Input];
  name: string;
}

const FormGroup = ({ inputsSchema, name }: Props) => {
  return (
    <div className='form__group-row'>
      <FieldArray name={name}>
        {({ remove, push, form }) => (
          <>
            <div className='form__group__label-wrapper'>
              <label htmlFor='null'>
                {name[0].toUpperCase() + name.slice(1, name.length)}:
              </label>
              <button
                type='button'
                onClick={() => push({ value: '', name: '' })}
              >
                Add +
              </button>
            </div>
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
                      <button type='button' onClick={() => remove(index)}>
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
