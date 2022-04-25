import React from 'react'
import { FastField, Form } from 'formik';

export default function NFTForm () {

  return (
    <Form>
      <div>
        Plik:
        <FastField name='file' type='file' />
      </div>

      <div>
        Token name:
        <FastField name='name' type='input' />
      </div>

      <div>
        Token symbol:
        <FastField name='symbol' type='input' />
      </div>

      <div>
        Description:
        <FastField name='description' type='input' />
      </div>
    </Form>
  );
}
