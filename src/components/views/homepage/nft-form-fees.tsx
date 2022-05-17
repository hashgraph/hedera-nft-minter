import React, { useCallback } from 'react';
import { FieldArray, Field } from 'formik';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import Switch from './../../shared/form/switch/Switch';
import { FeeKey } from '@utils/const/nft-form';

type Props = {
  fees: FeeKey[];
};

const NftFormFees = ({ fees }: Props) => {
  const renderRoyaltyFeeFormFields = useCallback(
    () => (
      <div className='form__row__fees'>
        <label htmlFor='null'>Royalty Fee:</label>

        <FieldWrapper
          name={'activeFees.royaltyFee.feeCollectorAccountId'}
          type='text'
          label='Fee collector account ID'
        />

        <FieldWrapper
          name={'activeFees.royaltyFee.fallbackFee'}
          type='number'
          label='Fallback fee'
        />

        <FieldWrapper
          name={'activeFees.royaltyFee.numerator'}
          type='number'
          label='Numerator'
        />

        <FieldWrapper
          name={'activeFees.royaltyFee.denominator'}
          type='number'
          label='Denominator'
        />
      </div>
    ),
    []
  );

  const renderFractionalFeeFormFields = useCallback(
    () => (
      <div className='form__row__fees'>
        <label htmlFor='null'>Fractional Fee:</label>

        <FieldWrapper
          name={'activeFees.fractionalFee.feeCollectorAccountId'}
          type='text'
          label='Fee collector account ID'
        />

        <FieldWrapper
          name={'activeFees.fractionalFee.numerator'}
          type='number'
          label='Numerator'
        />

        <FieldWrapper
          name={'activeFees.fractionalFee.denominator'}
          type='number'
          label='Denominator'
        />
        <FieldWrapper
          name={'activeFees.fractionalFee.min'}
          type='number'
          label='Min'
        />

        <FieldWrapper
          name={'activeFees.fractionalFee.max'}
          type='number'
          label='Max'
        />

        <Switch
          name={'activeFees.fractionalFee.assessmentMethod'}
          options={[
            { name: 'Inclusive', value: 'inclusive' },
            { name: 'Exclusive', value: 'exclusive' },
          ]}
        />
      </div>
    ),
    []
  );

  const renderFixedFeeFormFields = useCallback(
    () => (
      <div className='form__row__fees'>
        <label htmlFor='null'>Fixed Fee:</label>

        <FieldWrapper
          name={'activeFees.fixedFee.feeCollectorAccountId'}
          type='text'
          label='Fee collector account ID'
        />

        <FieldWrapper
          name={'activeFees.fixedFee.denominatingTokenId'}
          type='text'
          label='Denominating token ID'
        />

        <FieldWrapper
          name={'activeFees.fixedFee.amount'}
          type='number'
          label='Amount'
        />

        <FieldWrapper
          name={'activeFees.fixedFee.hbarAmount'}
          type='number'
          label='HBar amount'
        />
      </div>
    ),
    []
  );

  const renderCheckedFeesFormFields = useCallback(() => {
    return fees?.map((fee: string) => {
      switch (fee) {
        case 'royaltyFee':
          return renderRoyaltyFeeFormFields();
        case 'fractionalFee':
          return renderFractionalFeeFormFields();
        case 'fixedFee':
          return renderFixedFeeFormFields();
        default:
          return;
      }
    });
  }, [
    fees,
    renderRoyaltyFeeFormFields,
    renderFractionalFeeFormFields,
    renderFixedFeeFormFields,
  ]);

  return (
    <div>
      <label htmlFor='fees'>Fee type:</label>
      <FieldArray
        name='fees'
        render={() => (
          <div className='form__row'>
            <span>
              <label htmlFor='fees_fixedFee'>Fixed</label>
              <Field name='fees' type='checkbox' value='fixedFee' />
            </span>
            <span>
              <label htmlFor='fees_fractionalFee'>Fractional</label>
              <Field name='fees' type='checkbox' value='fractionalFee' />
            </span>
            <span>
              <label htmlFor='fees_royaltyFee'>Royality</label>
              <Field name='fees' type='checkbox' value='royaltyFee' />
            </span>
          </div>
        )}
      />
      {renderCheckedFeesFormFields()}
    </div>
  );
};

export default NftFormFees;
