import React from 'react'
import { FastField, FieldArray, Form, Field } from 'formik';

export default function NFTForm ({
  values,
}) {
  return (
    <Form className='form'>
      <div className='form__row'>
        File:
        <FastField name='image' type='file' />
      </div>

      <div className='form__row'>
        Token name:
        <FastField name='name' type='input' />
      </div>

      <div className='form__row'>
        Token symbol
        <FastField name='symbol' type='input' />
      </div>

      <div className='form__row'>
        Creator:
        <FastField name='creator' type='input' />
      </div>

      <div className='form__row'>
        Creator DID:
        <FastField name='creatorDID' type='input' />
      </div>

      <div className='form__row'>
        Description:
        <FastField name='creatorDID' type='textarea' />
      </div>

      <div className='form__row'>
        Token symbol:
        <FastField name='symbol' type='input' />
      </div>

      <div className='form__row'>
        Quantity:
        <FastField name='qty' type='number' />
      </div>

      <div>
        Properties:
        <FieldArray name='properties'>
          {({remove, push}) => (
            <div>
              {values.properties?.map((property: string, index: number) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`properties_${ index }`}
                  className='form__group'
                >
                  <div>
                    Name:
                    <Field name={ `properties.${ index }.name` } type='text' />
                  </div>
                  <div>
                    Value:
                    <Field name={ `properties.${ index }.value` } type='text' />
                  </div>

                  <button type='button' onClick={() => remove(index)}>remove</button>
                </div>
              ))}

              <button type='button' onClick={() => push({ value: '', name: ''})}>Add +</button>
            </div>
          )}
        </FieldArray>
      </div>

      <button>Submit</button>

      <pre>{JSON.stringify(values)}</pre>
    </Form>
  );
}
