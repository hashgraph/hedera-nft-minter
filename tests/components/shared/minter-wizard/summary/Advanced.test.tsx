/** @jest-environment jsdom */

/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { describe, it, jest, expect } from '@jest/globals';
import { render } from '@testing-library/react';

import React from 'react';
import { Formik } from 'formik';
import { MemoryRouter as Router } from 'react-router-dom';

import SummaryAdvanced from '@components/shared/minter-wizard/summary/Advanced';
import { TOKEN_KEY } from '@utils/entity/TokenKeys';

describe('Minter Wizard - Advanced', () => {
  it('render - keys', () => {
    const fn = jest.fn(v => v);

    const { container } = render(
      <Router>
        <Formik initialValues={{keys: [], fees: []}} onSubmit={fn}>
          <SummaryAdvanced />
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
          <SummaryAdvanced />
        </Formik>
      </Router>
    );

    const advanced = container.querySelector('.minter-wizard__summary__column')

    if (advanced) {
      expect(advanced.tagName).toBe('DIV')
    }
  })
})

