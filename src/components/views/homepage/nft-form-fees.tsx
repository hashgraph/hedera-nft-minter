import React, { useCallback} from 'react';
import { FieldArray, useField } from 'formik';
import { toast } from 'react-toastify';
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from 'react-transition-group';

import FieldWrapper from '@/components/shared/form/FieldWrapper';
import Switch from '@/components/shared/form/switch/Switch';
import { Fees, FEE } from '@utils/entity/Fees';
import FieldSelect from '@/components/shared/form/FieldSelect';

const NftFormFees = () => {
  const [field] = useField<Fees[]>('fees');
  const renderRoyaltyFeeFormFields = useCallback(
    (index: number) => (
      <div className='form__row__fees__fee'>
        <div>
          <FieldWrapper
            name={`fees.${ index }.feeCollectorAccountId`}
            type='text'
            label='Fee collector account ID'
          />
        </div>
        <div className='form__row__number-columns-flex'>
          <div className='form__row__number-columns-flex__column'>
            <FieldWrapper
              name={`fees.${ index }.fallbackFee`}
              type='number'
              label='Fallback fee'
            />
          </div>
          <div className='form__row__number-columns-flex__column'>
            <FieldWrapper
              name={`fees.${ index }.numerator`}
              type='number'
              label='Numerator'
            />
          </div>
          <div className='form__row__number-columns-flex__column'>
            <FieldWrapper
              name={`fees.${ index }.denominator`}
              type='number'
              label='Denominator'
            />
          </div>
        </div>
      </div>
    ),
    []
  );

  const renderFractionalFeeFormFields = useCallback(
    (index: number) => (
      <div className='form__row__fees__fee'>
        <FieldWrapper
          name={`fees.${ index }.feeCollectorAccountId`}
          type='text'
          label='Fee collector account ID'
        />
        <div className='form__row__number-columns-flex'>
          <div>
            <FieldWrapper
              name={`fees.${ index }.numerator`}
              type='number'
              label='Numerator'
            />
          </div>
          <div>
            <FieldWrapper
              name={`fees.${ index }.denominator`}
              type='number'
              label='Denominator'
            />
          </div>
          <div>
            <FieldWrapper
              name={`fees.${ index }.min`}
              type='number'
              label='Min'
            />
          </div>
          <div>
            <FieldWrapper
              name={`fees.${ index }.max`}
              type='number'
              label='Max'
            />
          </div>
        </div>

        <Switch
          label='Assessment method:'
          name={`fees.${ index }.assessmentMethod`}
          options={[
            { name: 'Inclusive', value: false },
            { name: 'Exclusive', value: true },
          ]}
        />
      </div>
    ),
    []
  );

  const renderFixedFeeFormFields = useCallback(
    (index: number) => (
      <div className='form__row__fees__fee'>
        <div className='form__row__two-columns-flex'>
          <div>
            <FieldWrapper
              name={`fees.${ index }.feeCollectorAccountId`}
              type='text'
              label='Fee collector account ID'
            />
          </div>
          <div>
            <FieldWrapper
              name={`fees.${ index }.denominatingTokenId`}
              type='text'
              label='Denominating token ID'
            />
          </div>
        </div>

        <div className='form__row__fixed-fee'>
          <div>
            <FieldWrapper
              name={`fees.${ index }.amount`}
              type='number'
              label='# amount'
            />
          </div>
          <div>
            <FieldWrapper
              name={`fees.${ index }.hbarAmount`}
              type='number'
              label='# ℏ amount'
            />
          </div>
        </div>
      </div>
    ),
    []
  );

  const renderFeeFieldset = useCallback(
    (fee: FEE, arrayIndex: number, remove: void) => {
      switch (fee) {
        case FEE.ROYALITY:
          return renderRoyaltyFeeFormFields(arrayIndex, remove);
        case FEE.FRACTIONAL:
          return renderFractionalFeeFormFields(arrayIndex, remove);
        case FEE.FIXED:
          return renderFixedFeeFormFields(arrayIndex, remove);
        case FEE.NONE:
          return;
      }
    },
    [
      renderRoyaltyFeeFormFields,
      renderFractionalFeeFormFields,
      renderFixedFeeFormFields,
    ]
  );

  return (
    <div className='form__group-row form__group-row-mt'>
      <FieldArray
        name='fees'
        render={({ push, remove }) => (
          <div className='form__row__fees'>
            <div className='form__group__label-wrapper'>
              <label htmlFor='null'>Fees</label>
              <button
                onClick={() =>
                  field.value.length < 10 ? push({}) : toast.error('Enough!')
                }
                type='button'
              >
                Add +
              </button>
            </div>
            <TransitionGroup className='form__group__list'>
              {field.value.map((_, index) => (
                <CSSTransition
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${ name }.${ index }.form__group__item`}
                  timeout={500}
                  classNames='form__group__item'
                >
                  <div className='form__row__fees-container'>
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={`fees_${ index }`}
                      className='form__row__fees-wrapper'
                    >
                      <div className='form__select_row'>
                        <FieldSelect name={`fees.${ index }.type`}>
                          <option value={FEE.NONE}>Select a fee type...</option>
                          <option value={FEE.ROYALITY}>Royalty Fee</option>
                          <option value={FEE.FRACTIONAL}>Fractional Fee</option>
                          <option value={FEE.FIXED}>Fixed Fee</option>
                        </FieldSelect>
                      </div>
                      <SwitchTransition>
                        <CSSTransition
                          timeout={300}
                          key={field.value[index].type}
                          addEndListener={(
                            node: HTMLElement,
                            done: () => void
                          ) =>
                            node.addEventListener('transitionend', done, false)
                          }
                          classNames='form__group__item'
                        >
                          <>
                            {renderFeeFieldset(field.value[index].type, index)}
                          </>
                        </CSSTransition>
                      </SwitchTransition>
                    </div>
                    <button onClick={() => remove(index)}>Remove</button>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        )}
      />
    </div>
  );
};

export default NftFormFees;
