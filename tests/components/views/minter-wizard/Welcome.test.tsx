/** @jest-environment jsdom */

import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Welcome from '@components/views/minter-wizard/Welcome';
import { Formik } from 'formik';

describe('Minter Wizard - Welcome page', () => {
  it('render', () => {
    render(
      <Router>
        <Formik initialValues={{}} onSubmit={v => console.log(v)}>
          <Welcome goToCreator={() => null} />
        </Formik>
      </Router>)
    ;
  })
})

