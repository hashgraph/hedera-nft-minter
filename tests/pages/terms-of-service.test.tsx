/** @jest-environment jsdom */

import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import TermsOfService from '@pages/terms-of-service';

describe('Terms of service page', () => {
  it('render', () => {
    render(<Router><TermsOfService /></Router>);
  })
})

