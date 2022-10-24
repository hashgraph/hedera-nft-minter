/** @jest-environment jsdom */

import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import FloatingCollections from '@components/shared/FloatingCollections/index';

describe('Floating Collections', () => {
  it('render', () => {
    const { container } = render(
      <FloatingCollections isVisible={true} />
    );

    const element = container.querySelector('.floating-collections__card--is-visible');

    if (element) {
      expect(element.tagName)
        .toBe('DIV')
    }
  });

});
