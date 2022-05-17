import { FieldArray } from 'formik';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import { DeleteOutlined } from '@ant-design/icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
                  <div className='form__group'>
                    {inputPair.map((input: Input, pairIndex: number) => (
                      <div
                        className='form__group__inputs_row'
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

                    <div className='form__group__remove_button_row'>
                      <button
                        type='button'
                        className='btn--icon'
                        onClick={() => remove(index)}
                      >
                        <DeleteOutlined />
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
