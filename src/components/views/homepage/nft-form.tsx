import React from 'react';
import { FieldArray, Form, Field, FormikProps, FormikValues } from 'formik';
import { DeleteOutlined } from '@ant-design/icons';

import Error from '@/components/shared/form/Error';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';
import Switch from './../../shared/form/switch/Switch';
import LabelErrorField from '@/components/shared/form/LabelErrorField';
import NftFormKeyField from '@/components/shared/form/NftFormKeyField';

export default function NFTForm({
  values,
  handleReset,
  isSubmitting,
}: FormikProps<FormikValues>) {
  return (
    <Form className='form'>
      <div>
        <div className='form__row'>
          <label htmlFor='image'>File:</label>
          <DragAndDropFileInput name='image' />
          <Error name='image' />
        </div>

        <div className='form__row'>
          <label htmlFor='null'>Properties:</label>
          <FieldArray name='properties'>
            {({ remove, push }) => (
              <div>
                {values.properties?.map((_: string, index: number) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`properties_${ index }`}
                    className='form__group'
                  >
                    <div className='form__properties__inputs_row'>
                      <LabelErrorField
                        label='Name'
                        name={`properties.${ index }.name`}
                        type='text'
                      />
                    </div>
                    <div className='form__properties__inputs_row'>
                      <LabelErrorField
                        label='Value'
                        name={`properties.${ index }.value`}
                        type='text'
                      />
                    </div>

                    <div>
                      <button
                        type='button'
                        className='btn--icon'
                        onClick={() => remove(index)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type='button'
                  onClick={() => push({ value: '', name: '' })}
                >
                  Add +
                </button>
              </div>
            )}
          </FieldArray>
        </div>
        <div className='form__row'>
          <label htmlFor='null'>Attributes:</label>
          <FieldArray name='attributes'>
            {({ remove, push }) => (
              <div>
                {values.attributes?.map((_: string, index: number) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`attributes_${ index }`}
                    className='form__group'
                  >
                    <div className='form__attributes__inputs_row'>
                      <LabelErrorField
                        label='Trait type'
                        name={`attributes.${ index }.trait_type`}
                        type='text'
                      />
                    </div>
                    <div className='form__attributes__inputs_row'>
                      <LabelErrorField
                        label='Value'
                        name={`attributes.${ index }.value`}
                        type='text'
                      />
                    </div>

                    <div>
                      <button
                        type='button'
                        className='btn--icon'
                        onClick={() => remove(index)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type='button'
                  onClick={() => push({ value: '', name: '' })}
                >
                  Add +
                </button>
              </div>
            )}
          </FieldArray>
        </div>
      </div>

      <div>
        <div className='form__row'>
          <LabelErrorField
            fast_field={true}
            name='name'
            type='text'
            label='Token name'
          />
        </div>

        <div className='form__row'>
          <LabelErrorField
            fast_field={true}
            name='symbol'
            type='text'
            label='Token symbol'
          />
        </div>

        <div className='form__row'>
          <LabelErrorField
            fast_field={true}
            name='creator'
            type='text'
            label='Creator'
          />
        </div>

        <div className='form__row'>
          <LabelErrorField
            fast_field={true}
            name='creatorDID'
            type='text'
            label='Creator DID'
          />
        </div>

        <div className='form__row'>
          <LabelErrorField
            fast_field={true}
            name='description'
            type='test'
            label='Description'
          />
        </div>

        <div className='form__row'>
          <LabelErrorField
            fast_field={true}
            name='qty'
            type='number'
            label='Quantity'
            max='10'
          />
        </div>

        <div className='form__row'>
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
          {values?.fees?.map((fee: string) => {
            switch (fee) {
              case 'royaltyFee':
                return (
                  <div className='form__row__fees'>
                    <label htmlFor='null'>Royalty Fee:</label>

                    <LabelErrorField
                      name={`activeFees.${ fee }.feeCollectorAccountId`}
                      type='text'
                      label='Fee collector account ID'
                    />

                    <LabelErrorField
                      name={`activeFees.${ fee }.fallbackFee`}
                      type='number'
                      label='Fallback fee'
                    />

                    <LabelErrorField
                      name={`activeFees.${ fee }.numerator`}
                      type='number'
                      label='Numerator'
                    />

                    <LabelErrorField
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

                    <LabelErrorField
                      name={`activeFees.${ fee }.feeCollectorAccountId`}
                      type='text'
                      label='Fee collector account ID'
                    />

                    <LabelErrorField
                      name={`activeFees.${ fee }.numerator`}
                      type='number'
                      label='Numerator'
                    />

                    <LabelErrorField
                      name={`activeFees.${ fee }.denominator`}
                      type='number'
                      label='Denominator'
                    />
                    <LabelErrorField
                      name={`activeFees.${ fee }.min`}
                      type='number'
                      label='Min'
                    />

                    <LabelErrorField
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

                    <LabelErrorField
                      name={`activeFees.${ fee }.feeCollectorAccountId`}
                      type='text'
                      label='Fee collector account ID'
                    />

                    <LabelErrorField
                      name={`activeFees.${ fee }.denominatingTokenId`}
                      type='text'
                      label='Denominating token ID'
                    />

                    <LabelErrorField
                      name={`activeFees.${ fee }.amount`}
                      type='number'
                      label='Amount'
                    />

                    <LabelErrorField
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
        </div>
        <div className='form__row'>
          <label htmlFor='treasury'>
            Treasury account:
            <span>
              <label htmlFor='treasury_account'>
                <Field name='treasury' type='radio' value='account' />
                My account id
              </label>
              <label htmlFor='treasury_custom'>
                <Field name='treasury' type='radio' value='custom' />
                Custom account id
              </label>
            </span>
          </label>
          {values.treasury === 'custom' && (
            <>
              <Field name='treasury_account_id' type='input' />
              <Error name='treasury_account_id' />
            </>
          )}
        </div>

        <div className='form__row'>
          <NftFormKeyField name='kyc' />
        </div>

        <div className='form__row'>
          <NftFormKeyField name='admin' />
        </div>

        <div className='form__row'>
          <NftFormKeyField name='freeze' />
        </div>

        <div className='form__row'>
          <NftFormKeyField name='wipe' />
        </div>

        <div className='form__row'>
          <NftFormKeyField name='pause' />
        </div>

        <div className='form__row'>
          <NftFormKeyField name='supply' />
        </div>

        <div className='form__btns'>
          <button type='submit' className='btn--md' disabled={isSubmitting}>
            Submit
          </button>
          <button
            type='button'
            onClick={handleReset}
            className='btn--grey btn--md'
            disabled={isSubmitting}
          >
            Clear form
          </button>
        </div>
      </div>
    </Form>
  );
}
