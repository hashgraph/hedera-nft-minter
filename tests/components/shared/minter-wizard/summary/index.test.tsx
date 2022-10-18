/** @jest-environment jsdom */

import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Formik } from 'formik';
import MinterWizardSummary from '@components/shared/minter-wizard/summary';

describe('Minter Wizard - index summary', () => {
  it('render', () => {
    const fn = jest.fn(v => v);
    const goToCreator = jest.fn();

    render(<Router>
      <Formik initialValues={{fees: [], keys: []}} onSubmit={fn}>
        <MinterWizardSummary goToCreator={goToCreator} />
      </Formik>
    </Router>);
  })
})

