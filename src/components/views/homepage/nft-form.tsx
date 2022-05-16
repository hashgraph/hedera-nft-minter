import React from 'react';
import { FieldArray, Form, Field, FormikProps, FormikValues } from 'formik';
import { DeleteOutlined } from '@ant-design/icons';

import Error from '@/components/shared/form/Error';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import NFTKeyField from '@/components/shared/form/NFTKeyField';
import NftFormFees from '@/components/views/homepage/nft-form-fees';

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
        </div>
        <Error name='image' />
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
                      <FieldWrapper
                        label='Name'
                        name={`properties.${ index }.name`}
                        type='text'
                      />
                    </div>
                    <div className='form__properties__inputs_row'>
                      <FieldWrapper
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
                      <FieldWrapper
                        label='Trait type'
                        name={`attributes.${ index }.trait_type`}
                        type='text'
                      />
                    </div>
                    <div className='form__attributes__inputs_row'>
                      <FieldWrapper
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
          <FieldWrapper fastField name='name' type='text' label='Token name' />
        </div>

        <div className='form__row'>
          <FieldWrapper
            fastField
            name='symbol'
            type='text'
            label='Token symbol'
          />
        </div>

        <div className='form__row'>
          <FieldWrapper fastField name='creator' type='text' label='Creator' />
        </div>

        <div className='form__row'>
          <FieldWrapper
            fastField
            name='creatorDID'
            type='text'
            label='Creator DID'
          />
        </div>

        <div className='form__row'>
          <FieldWrapper
            fastField
            name='description'
            type='test'
            label='Description'
          />
        </div>

        <div className='form__row'>
          <FieldWrapper
            fastField
            name='qty'
            type='number'
            label='Quantity'
            max='10'
          />
        </div>

        <div className='form__row'>
          <NftFormFees fees={values.fees} />
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
          <NFTKeyField name='kyc' />
        </div>

        <div className='form__row'>
          <NFTKeyField name='admin' />
        </div>

        <div className='form__row'>
          <NFTKeyField name='freeze' />
        </div>

        <div className='form__row'>
          <NFTKeyField name='wipe' />
        </div>

        <div className='form__row'>
          <NFTKeyField name='pause' />
        </div>

        <div className='form__row'>
          <NFTKeyField name='supply' />
        </div>

        <div className='form__btns'>
          <button
            type='button'
            onClick={handleReset}
            className='btn--grey btn--transparent-white'
            disabled={isSubmitting}
          >
            Clear form
          </button>
          <button type='submit' className='btn' disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
}
