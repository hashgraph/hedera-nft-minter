import React from 'react';
import { FastField, FieldArray, Form, Field } from 'formik';
import { DeleteOutlined } from '@ant-design/icons';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';

export default function NFTForm({ values, errors, touched, handleReset }) {
  return (
    <Form className='form'>
      <div>
        <div className='form__row'>File:</div>
        <DragAndDropFileInput name='image' />
        {touched?.image && (
          <div className='form__error image_error'>{errors?.image}</div>
        )}

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
                      {errors?.properties?.length > 0 &&
                        touched.properties?.length > 0 &&
                        touched?.properties[index]?.name && (
                          <div className='form__error'>
                            {errors?.properties[index]?.name}
                          </div>
                        )}
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
                      {errors?.properties?.length > 0 &&
                        touched.properties?.length > 0 &&
                        touched?.properties[index]?.value && (
                          <div className='form__error'>
                            {errors?.properties[index]?.value}
                          </div>
                        )}
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
        {touched?.name && <div className='form__error'>{errors?.name}</div>}

        <div className='form__row'>
          <label htmlFor='symbol'>Token symbol</label>
          <FastField name='symbol' type='input' />
        </div>
        {touched?.symbol && <div className='form__error'>{errors?.symbol}</div>}

        <div className='form__row'>
          <label htmlFor='creator'>Creator:</label>
          <FastField name='creator' type='input' />
        </div>
        {touched?.creator && (
          <div className='form__error'>{errors?.creator}</div>
        )}

        <div className='form__row'>
          <label htmlFor='creatorDID'>Creator DID:</label>
          <FastField name='creatorDID' type='input' />
        </div>
        {touched?.creatorDID && (
          <div className='form__error'>{errors?.creatorDID}</div>
        )}

        <div className='form__row'>
          <label htmlFor='description'>Description:</label>
          <FastField name='description' type='textarea' />
        </div>
        {touched?.description && (
          <div className='form__error'>{errors?.description}</div>
        )}

        <div className='form__row'>
          <label htmlFor='qty'>Quantity:</label>
          <FastField id='qty' name='qty' type='number' />
        </div>
        {touched?.qty && <div className='form__error'>{errors?.qty}</div>}

        <div className='form__btns'>
          <button type='submit' className='btn--md'>
            Submit
          </button>
          <button
            type='button'
            onClick={handleReset}
            className='btn--grey btn--md'
          >
            Clear form
          </button>
        </div>
      </div>

      <pre>{JSON.stringify(values)}</pre>
    </Form>
  );
}
