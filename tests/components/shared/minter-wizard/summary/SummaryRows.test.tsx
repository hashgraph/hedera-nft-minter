/** @jest-environment jsdom */

import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import SummaryRows from '@components/shared/minter-wizard/summary/SummaryRows';

describe('Minter Wizard - SummaryRows', () => {
  it('render', () => {
    render(
      <Router>
          <SummaryRows data={[]} />
      </Router>)
    ;
  })
})

