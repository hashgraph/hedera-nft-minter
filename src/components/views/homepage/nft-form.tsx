import React from 'react';
import { FastField, FieldArray, Form, Field } from 'formik';
import { DeleteOutlined } from '@ant-design/icons';
import DragAndDropFileInput from '@/components/shared/form/DragAndDropFileInput';
import Error from '@/components/shared/form/Error';

export default function NFTForm({ values, handleReset }) {
  return (
    <Form className='form'>
      <div>
        <div className='form__row'>File:</div>
        <DragAndDropFileInput name='image' />
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
          <FastField id='qty' name='qty' type='number' />
        </div>
        <Error name={'qty'} />

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
