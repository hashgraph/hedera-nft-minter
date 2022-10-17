/** @jest-environment jsdom */

import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Welcome from '@components/views/minter-wizard/Welcome';
import { Formik } from 'formik';

describe('Minter Wizard - Welcome page', () => {
  it('render', () => {
    const fn = jest.fn(v => v);

    render(
      <Router>
        <Formik initialValues={{}} onSubmit={fn}>
          <Welcome goToCreator={() => null} />
        </Formik>
      </Router>)
    ;
  })
})

