/** @jest-environment jsdom */

import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseLayout } from '@components/shared/layout/Base.layout';

describe('Base layout', () => {
  it('render', () => {
    const { container } = render(<Router>
      <BaseLayout>
        <div id='test'>test</div>
      </BaseLayout>
    </Router>);

    const test = container.querySelector('#test');

    if (test) {
      expect(test.tagName).toBe('DIV')
    }
  })
})

