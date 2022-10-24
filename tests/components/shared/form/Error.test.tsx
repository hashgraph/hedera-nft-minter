/** @jest-environment jsdom */
import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { Formik } from 'formik';
import Error from '@components/shared/form/Error';

describe('Base layout', () => {
  it('render', () => {
    const fn = jest.fn(v => v);

    render(
      <Formik initialValues={{}} onSubmit={fn}>
          <Error name='test' />
      </Formik>
    );
  });

});
