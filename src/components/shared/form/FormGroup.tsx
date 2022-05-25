import { FieldArray } from 'formik';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import FieldWrapper from '@/components/shared/form/FieldWrapper';

type Input = {
  label: string;
  name: string;
  type: string;
};

type InputPair = [Input, Input];

interface Props {
  values: InputPair[];
  name: string;
}

const FormGroup = ({ values, name }: Props) => {
  return (
    <div className='form__group-row'>
      <FieldArray name={name}>
        {({ remove, push }) => (
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
              {values?.map((inputPair: InputPair, index: number) => (
                <CSSTransition
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${ name }.${ index }.form__group__item`}
                  timeout={500}
                  classNames='form__group__item'
                >
                  <div className='form__group__inputs'>
                    {inputPair.map((input: Input, pairIndex: number) => (
                      <div
                        className='form__group__inputs__row'
                        // eslint-disable-next-line react/no-array-index-key
                        key={`form__group__inputs_row_${ index }.${ pairIndex }_${ name }.${ input.name }`}
                      >
                        <FieldWrapper
                          label={input.label}
                          name={`${ name }.${ index }.${ input.name }`}
                          type={input.type}
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
