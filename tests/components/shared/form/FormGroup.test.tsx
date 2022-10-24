/** @jest-environment jsdom */
import React from 'react';
import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import FormGroup from '@components/shared/form/FormGroup';

describe('FormGroup', () => {
  it('render', () => {
    const fn = jest.fn(v => v);

    render(
      <Formik initialValues={{properties: []}} onSubmit={fn}>
        <FormGroup
          name='properties'
          label='Properties'
          tooltip='Properties describe non-rarity elements which relate to the NFT such as website,
            license type, social media handles and more.'
          inputsSchema={[
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              placeholder: 'e.g website',
              maxLength: 100
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              placeholder: 'e.g www.mysite.com',
              maxLength: 100
            },
          ]}
        />
      </Formik>);
  })

});
