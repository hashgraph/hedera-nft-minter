/** @jest-environment jsdom */

import { describe, it, jest, expect } from '@jest/globals';
import { render } from '@testing-library/react';

import React from 'react';
import { Formik } from 'formik';
import { MemoryRouter as Router } from 'react-router-dom';

import Advanced from '@components/shared/minter-wizard/summary/Advanced';
import { TOKEN_KEY } from '@utils/entity/TokenKeys';

describe('Minter Wizard - Advanced', () => {
  it('render - keys', () => {
    const fn = jest.fn(v => v);

    const { container } = render(
      <Router>
        <Formik initialValues={{keys: [], fees: []}} onSubmit={fn}>
          <Advanced />
        </Formik>
      </Router>
    );

    const advanced = container.querySelector('.minter-wizard__summary__column')

    expect(advanced).toBe(null);
  })

  it('render - keys', () => {
    const fn = jest.fn(v => v);

    const { container } = render(
      <Router>
        <Formik initialValues={{keys: [TOKEN_KEY.TREASURY], fees: []}} onSubmit={fn}>
          <Advanced />
        </Formik>
      </Router>
    );

    const advanced = container.querySelector('.minter-wizard__summary__column')

    if (advanced) {
      expect(advanced.nodeType).toBe('div')
    }
  })
})

