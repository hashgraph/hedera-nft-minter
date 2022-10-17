/** @jest-environment jsdom */

import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Advanced from '@components/shared/minter-wizard/summary/Advanced';
import { Formik } from 'formik';

describe('Minter Wizard - Advanced', () => {
  it('render - keys', () => {
    const fn = jest.fn(v => v);

    render(
      <Router>
        <Formik initialValues={{keys: [], fees: []}} onSubmit={fn}>
          <Advanced />
        </Formik>
      </Router>
    );
  })
})

