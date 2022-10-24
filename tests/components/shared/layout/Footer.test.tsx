/** @jest-environment jsdom */
import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '@components/shared/layout/Footer';

describe('Footer', () => {
  it('render', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });

});
