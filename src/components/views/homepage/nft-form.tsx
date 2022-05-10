import React from 'react';
import {
  FastField,
  FieldArray,
  Form,
  Field,
  FormikProps,
  FormikValues,
} from 'formik';
import { DeleteOutlined } from '@ant-design/icons';

import Error from '@/components/shared/form/Error';
import Switch from '@components/shared/form/switch/Switch';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';

export default function NFTForm({
  values,
  handleReset,
  isSubmitting,
}: FormikProps<FormikValues>) {
  return (
    <Form className='form'>
      <div>
        <div className='form__row'>
          <label htmlFor='hip'>NFT Type:</label>
          <Switch
            name='hip'
            options={[
              { name: 'HIP-10', value: 'hip-10' },
              { name: 'HIP-412', value: 'hip-412' },
            ]}
          />
        </div>
        <div className='form__row'>
          <label htmlFor='image'>File:</label>
          <DragAndDropFileInput name='image' />
          <Error name='image' />
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

        <div className='form__row'>
          <label htmlFor='null'>Properties:</label>
          <FieldArray name='properties'>
            {({ remove, push }) => (
              <div>
                {values.properties?.map((property: string, index: number) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`properties_${ index }`}
                    className='form__group'
                  >
                    <div className='form__properties__inputs_row'>
                      <label htmlFor={`properties.${ index }.name`}>Name:</label>
                      <Field
                        id={`properties.${ index }.name`}
                        name={`properties.${ index }.name`}
                        type='text'
                      />
                      <Error name={`properties.${ index }.name`} />
                    </div>
                    <div className='form__properties__inputs_row'>
                      <label htmlFor={`properties.${ index }.value`}>
                        Value:
                      </label>
                      <Field
                        id={`properties.${ index }.value`}
                        name={`properties.${ index }.value`}
                        type='text'
                      />
                      <Error name={`properties.${ index }.value`} />
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
          <label htmlFor='name'>Token name:</label>
          <FastField name='name' type='input' />
        </div>
        <Error name={'name'} />

        <div className='form__row'>
          <label htmlFor='symbol'>Token symbol</label>
          <FastField name='symbol' type='input' />
        </div>
        <Error name={'symbol'} />

        <div className='form__row'>
          <label htmlFor='creator'>Creator:</label>
          <FastField name='creator' type='input' />
        </div>
        <Error name={'creator'} />

        <div className='form__row'>
          <label htmlFor='creatorDID'>Creator DID:</label>
          <FastField name='creatorDID' type='input' />
        </div>
        <Error name={'creatorDID'} />

        <div className='form__row'>
          <label htmlFor='description'>Description:</label>
          <FastField name='description' type='textarea' />
        </div>
        <Error name={'description'} />

        <div className='form__row'>
          <label htmlFor='qty'>Quantity:</label>
          <FastField id='qty' name='qty' type='number' max={10} />
        </div>
        <Error name={'qty'} />

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
