import React from 'react';
import { FieldArray, Field } from 'formik';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import Switch from './../../shared/form/switch/Switch';
import { FeeKey } from '@/pages/homepage';

type Props = {
  fees: FeeKey[];
};

const NftFormFees = ({ fees }: Props) => {
  return (
    <>
      <label htmlFor='fees'>
        Fee type:
        <FieldArray
          name='fees'
          render={() => (
            <span>
              <label htmlFor='fees_fixedFee'>
                <Field name='fees' type='checkbox' value='fixedFee' />
                Fixed
              </label>
              <label htmlFor='fees_fractionalFee'>
                <Field name='fees' type='checkbox' value='fractionalFee' />
                Fractional
              </label>
              <label htmlFor='fees_royaltyFee'>
                <Field name='fees' type='checkbox' value='royaltyFee' />
                Royality
              </label>
            </span>
          )}
        />
      </label>
      {fees?.map((fee: string) => {
        switch (fee) {
          case 'royaltyFee':
            return (
              <div className='form__row__fees'>
                <label htmlFor='null'>Royalty Fee:</label>

                <FieldWrapper
                  name={`activeFees.${ fee }.feeCollectorAccountId`}
                  type='text'
                  label='Fee collector account ID'
                />

                <FieldWrapper
                  name={`activeFees.${ fee }.fallbackFee`}
                  type='number'
                  label='Fallback fee'
                />

                <FieldWrapper
                  name={`activeFees.${ fee }.numerator`}
                  type='number'
                  label='Numerator'
                />

                <FieldWrapper
                  name={`activeFees.${ fee }.denominator`}
                  type='number'
                  label='Denominator'
                />
              </div>
            );
          case 'fractionalFee':
            return (
              <div className='form__row__fees'>
                <label htmlFor='null'>Fractional Fee:</label>

                <FieldWrapper
                  name={`activeFees.${ fee }.feeCollectorAccountId`}
                  type='text'
                  label='Fee collector account ID'
                />

                <FieldWrapper
                  name={`activeFees.${ fee }.numerator`}
                  type='number'
                  label='Numerator'
                />

                <FieldWrapper
                  name={`activeFees.${ fee }.denominator`}
                  type='number'
                  label='Denominator'
                />
                <FieldWrapper
                  name={`activeFees.${ fee }.min`}
                  type='number'
                  label='Min'
                />

                <FieldWrapper
                  name={`activeFees.${ fee }.max`}
                  type='number'
                  label='Max'
                />

                <Switch
                  name={`activeFees.${ fee }.assessmentMethod`}
                  options={[
                    { name: 'Inclusive', value: 'inclusive' },
                    { name: 'Exclusive', value: 'exclusive' },
                  ]}
                />
              </div>
            );
          case 'fixedFee':
            return (
              <div className='form__row__fees'>
                <label htmlFor='null'>Fixed Fee:</label>

                <FieldWrapper
                  name={`activeFees.${ fee }.feeCollectorAccountId`}
                  type='text'
                  label='Fee collector account ID'
                />

                <FieldWrapper
                  name={`activeFees.${ fee }.denominatingTokenId`}
                  type='text'
                  label='Denominating token ID'
                />

                <FieldWrapper
                  name={`activeFees.${ fee }.amount`}
                  type='number'
                  label='Amount'
                />

                <FieldWrapper
                  name={`activeFees.${ fee }.hbarAmount`}
                  type='number'
                  label='HBar amount'
                />
              </div>
            );
          default:
            return;
        }
      })}
    </>
  );
};

export default NftFormFees;
