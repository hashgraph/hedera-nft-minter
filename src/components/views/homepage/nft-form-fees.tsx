import React, { useCallback } from 'react';
import { FieldArray, Field, useField } from 'formik';
import { toast } from 'react-toastify';

import FieldWrapper from '@/components/shared/form/FieldWrapper';
import Switch from '@/components/shared/form/switch/Switch';
import { Fees, FEE } from '@utils/entity/Fees';

const NftFormFees = () => {
  const [field] = useField<Fees[]>('fees');
  const renderRoyaltyFeeFormFields = useCallback((index: number) => (
      <div className='form__row__fees'>
        <FieldWrapper
          name={`fees.${ index }.feeCollectorAccountId`}
          type='text'
          label='Fee collector account ID'
        />

        <FieldWrapper
          name={`fees.${ index }.fallbackFee`}
          type='number'
          label='Fallback fee'
        />

        <FieldWrapper
          name={`fees.${ index }.numerator`}
          type='number'
          label='Numerator'
        />

        <FieldWrapper
          name={`fees.${ index }.denominator`}
          type='number'
          label='Denominator'
        />
      </div>
    ),
    []
  );

  const renderFractionalFeeFormFields = useCallback(
    (index: number) => (
      <div className='form__row__fees'>
        <FieldWrapper
          name={`fees.${ index }.feeCollectorAccountId`}
          type='text'
          label='Fee collector account ID'
        />

        <FieldWrapper
          name={`fees.${ index }.numerator`}
          type='number'
          label='Numerator'
        />

        <FieldWrapper
          name={`fees.${ index }.denominator`}
          type='number'
          label='Denominator'
        />
        <FieldWrapper
          name={`fees.${ index }.min`}
          type='number'
          label='Min'
        />

        <FieldWrapper
          name={`fees.${ index }.max`}
          type='number'
          label='Max'
        />

        <Switch
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
      <div className='form__row__fees'>
        <FieldWrapper
          name={`fees.${ index }.feeCollectorAccountId`}
          type='text'
          label='Fee collector account ID'
        />

        <FieldWrapper
          name={`fees.${ index }.denominatingTokenId`}
          type='text'
          label='Denominating token ID'
        />

        <FieldWrapper
          name={`fees.${ index }.amount`}
          type='number'
          label='Amount'
        />

        <FieldWrapper
          name={`fees.${ index }.hbarAmount`}
          type='number'
          label='HBar amount'
        />
      </div>
    ),
    []
  );

  const renderFeeFieldset = useCallback((fee: FEE, arrayIndex: number) => {
    switch (fee) {
      case FEE.ROYALITY:
        return renderRoyaltyFeeFormFields(arrayIndex);
      case FEE.FRACTIONAL:
        return renderFractionalFeeFormFields(arrayIndex);
      case FEE.FIXED:
        return renderFixedFeeFormFields(arrayIndex);
    }
  }, [
    renderRoyaltyFeeFormFields,
    renderFractionalFeeFormFields,
    renderFixedFeeFormFields,
  ]);

  return (
    <div>
      <FieldArray
        name='fees'
        render={({ push }) => (
          <>
            <h2>
              Fees
              <button onClick={() => field.value.length < 10 ? push({}) : toast.error('Enough!')} type='button'>Add Fee +</button>
            </h2>

            <div>
              {field.value.map((fee, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`fees_${ index }`}>
                  <Field name={`fees.${ index }.type`} as='select'>
                    <option value={FEE.ROYALITY}>Royalty Fee</option>
                    <option value={FEE.FRACTIONAL}>Fractional Fee</option>
                    <option value={FEE.FIXED}>Fixed Fee</option>
                  </Field>

                  {renderFeeFieldset(field.value[index].type, index)}
                </div>
              ))}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default NftFormFees;
