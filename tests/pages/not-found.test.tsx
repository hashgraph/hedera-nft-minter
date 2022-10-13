/** @jest-environment jsdom */

import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import NotFound from '@pages/not-found';

describe('NotFound page', () => {
  it('render', () => {
    const { getByText } = render(<Router><NotFound /></Router>);

    getByText('404 Not found')
  })
})

