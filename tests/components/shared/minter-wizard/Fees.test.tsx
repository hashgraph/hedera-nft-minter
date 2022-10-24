/** @jest-environment jsdom */
import React from 'react';
import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import Fees from '@components/shared/minter-wizard/Fees';

describe('Fees', () => {
  it('render', () => {
    const fn = jest.fn(v => v);

    render(
      <Formik initialValues={{fees: []}} onSubmit={fn}>
        <Fees />
      </Formik>);
  })

});
