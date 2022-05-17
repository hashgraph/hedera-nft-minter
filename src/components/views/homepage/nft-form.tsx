import React, { useState, useCallback } from 'react';
import { Form, Field, FormikProps, FormikValues } from 'formik';
import Error from '@/components/shared/form/Error';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import NFTKeyField from '@/components/shared/form/NFTKeyField';
import FormGroup from '@/components/shared/form/FormGroup';
import NftFormFees from '@/components/views/homepage/nft-form-fees';
import FormStep from '@/components/shared/form/FormStep';

export default function NFTForm({
  values,
  handleReset,
  isSubmitting,
}: FormikProps<FormikValues>) {
  const [customKeys, setCustomKeys] = useState(false);

  const toogleCustomKeys = useCallback(
    () => setCustomKeys(!customKeys),
    [customKeys, setCustomKeys]
  );

  return (
    <Form className='form'>
      <div>
        <FormStep title='Universal' />
        <div className='form__row__two-columns'>
          <div className='form__row__two-columns'>
            <div>
              <FieldWrapper
                fastField
                name='name'
                type='text'
                label='Token name'
              />
            </div>
            <div>
              <FieldWrapper
                fastField
                name='symbol'
                type='text'
                label='Token symbol'
              />
            </div>
          </div>
          <div className='form__row'>
            <label htmlFor='image'>File:</label>
            <DragAndDropFileInput name='image' />
            <div className='form__error_wrapper'>
              <Error name='image' />
            </div>
          </div>
        </div>
      </div>

      <div>
        <FormStep title='On-chain' />
        <div className='form__row__two-columns'>
          <div className='form__row__two-columns'>
            <div>
              <FieldWrapper
                fastField
                name='creator'
                type='text'
                label='Creator'
              />
            </div>
            <div>
              <FieldWrapper
                fastField
                name='creatorDID'
                type='text'
                label='Creator DID'
              />
            </div>
          </div>

          <div className='form__row__two-columns-flex'>
            <div className='before-number'>
              <FieldWrapper
                fastField
                name='description'
                type='test'
                label='Description'
              />
            </div>

            <div className='number'>
              <FieldWrapper
                fastField
                name='qty'
                type='number'
                label='# quantity'
                max='10'
              />
            </div>
          </div>
        </div>
        <div className='form__row__two-columns'>
          <div className='form__row'>
            <label htmlFor={'null'}>Custom keys</label>
            <button type='button' name='custom_keys' onClick={toogleCustomKeys}>
              Show keys
            </button>
            {customKeys && (
              <div>
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
              </div>
            )}
          </div>

          <NftFormFees fees={values.fees} />
        </div>
      </div>

      <div>
        <FormStep title='Off-chain' />
        <div className='form__row__two-columns'>
          <FormGroup
            name='properties'
            values={values.properties.map(() => [
              {
                name: 'name',
                type: 'string',
                label: 'Name',
              },
              {
                name: 'value',
                type: 'string',
                label: 'Value',
              },
            ])}
          />
          <FormGroup
            name='attributes'
            values={values.attributes.map(() => [
              {
                name: 'trait_type',
                type: 'string',
                label: 'Trait type',
              },
              {
                name: 'value',
                type: 'string',
                label: 'Value',
              },
            ])}
          />
        </div>
      </div>
      <div>
        <FormStep title='Summary' noDescription />
        <div className='form__row__two-columns'>
          <div>
            <h1>Finallization</h1>
            <p>
              Quisque velit nisi, pretium ut lacinia in, elementum id enim.
              Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui
              posuere blandit. Proin eget tortor risus.
            </p>
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
      </div>
    </Form>
  );
}
