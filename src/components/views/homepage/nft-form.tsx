import React from 'react';
import { FieldArray, Form, Field, FormikProps, FormikValues } from 'formik';
import { DeleteOutlined } from '@ant-design/icons';

import Error from '@/components/shared/form/Error';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';
import Switch from './../../shared/form/switch/Switch';
import LabelErrorField from '@/components/shared/form/LabelErrorField';

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
                        { name: 'Inclusive', value: false },
                        { name: 'Exclusive', value: true },
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
          <label htmlFor='kyc'>
            KYC key:
            <span>
              <label htmlFor='kyc_no'>
                <Field name='kyc' type='radio' value='no' />
                No key
              </label>
              <label htmlFor='kyc_account'>
                <Field name='kyc' type='radio' value='account' />
                My account key
              </label>
              <label htmlFor='kyc_custom'>
                <Field name='kyc' type='radio' value='custom' />
                Custom key
              </label>
            </span>
          </label>
          {values.kyc === 'custom' && (
            <>
              <Field name='kyc_key' type='input' />
              <Error name='kyc_key' />
            </>
          )}
        </div>

        <div className='form__row'>
          <label htmlFor='admin'>
            Admin key:
            <span>
              <label htmlFor='admin_no'>
                <Field name='admin' type='radio' value='no' />
                No key
              </label>
              <label htmlFor='admin_account'>
                <Field name='admin' type='radio' value='account' />
                My account key
              </label>
              <label htmlFor='admin_custom'>
                <Field name='admin' type='radio' value='custom' />
                Custom key
              </label>
            </span>
          </label>
          {values.admin === 'custom' && (
            <>
              <Field name='admin_key' type='input' />
              <Error name='admin_key' />
            </>
          )}
        </div>

        <div className='form__row'>
          <label htmlFor='freeze'>
            Freeze key:
            <span>
              <label htmlFor='freeze_no'>
                <Field name='freeze' type='radio' value='no' />
                No key
              </label>
              <label htmlFor='freeze_account'>
                <Field name='freeze' type='radio' value='account' />
                My account key
              </label>
              <label htmlFor='freeze_custom'>
                <Field name='freeze' type='radio' value='custom' />
                Custom key
              </label>
            </span>
          </label>
          {values.freeze === 'custom' && (
            <>
              <Field name='freeze_key' type='input' />
              <Error name='freeze_key' />
            </>
          )}
        </div>

        <div className='form__row'>
          <label htmlFor='wipe'>
            Wipe key:
            <span>
              <label htmlFor='wipe_no'>
                <Field name='wipe' type='radio' value='no' />
                No key
              </label>
              <label htmlFor='wipe_account'>
                <Field name='wipe' type='radio' value='account' />
                My account key
              </label>
              <label htmlFor='wipe_custom'>
                <Field name='wipe' type='radio' value='custom' />
                Custom key
              </label>
            </span>
          </label>
          {values.wipe === 'custom' && (
            <>
              <Field name='wipe_key' type='input' />
              <Error name='wipe_key' />
            </>
          )}
        </div>

        <div className='form__row'>
          <label htmlFor='pause'>
            Pause key:
            <span>
              <label htmlFor='pause_no'>
                <Field name='pause' type='radio' value='no' />
                No key
              </label>
              <label htmlFor='pause_account'>
                <Field name='pause' type='radio' value='account' />
                My account key
              </label>
              <label htmlFor='pause_custom'>
                <Field name='pause' type='radio' value='custom' />
                Custom key
              </label>
            </span>
          </label>
          {values.pause === 'custom' && (
            <>
              <Field name='pause_key' type='input' />
              <Error name='pause_key' />
            </>
          )}
        </div>

        <div className='form__row'>
          <label htmlFor='supply'>
            Supply key:
            <span>
              <label htmlFor='supply_no'>
                <Field name='supply' type='radio' value='no' />
                No key
              </label>
              <label htmlFor='supply_account'>
                <Field name='supply' type='radio' value='account' />
                My account key
              </label>
              <label htmlFor='supply_custom'>
                <Field name='supply' type='radio' value='custom' />
                Custom key
              </label>
            </span>
          </label>
          {values.supply === 'custom' && (
            <>
              <Field name='supply_key' type='input' />
              <Error name='supply_key' />
            </>
          )}
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
