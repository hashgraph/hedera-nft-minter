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
        </div>
        <Error name='image' />
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
