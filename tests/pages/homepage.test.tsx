/** @jest-environment jsdom */
import React from 'react';
import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import MinterWizard from '@pages/homepage';

describe('Homepage', () => {
  it('render', () => {
    render(<MinterWizard />);
  })

});
