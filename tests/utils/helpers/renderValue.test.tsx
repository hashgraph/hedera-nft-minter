/** @jest-environment jsdom */

import renderValue from '@utils/helpers/renderValue';
import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

describe('renderValue', () => {
  it('should be value', () => {
    const renderedValue = renderValue('test');

    expect(renderedValue).toBe('test')
  })

  it('should be empty', () => {
    const renderedValue = renderValue(undefined);

    if (typeof renderedValue != 'string' && typeof renderedValue != 'number') {
      const { getByText } = render(renderedValue);

      getByText('(empty)')
    }
  })

  it('should be empty with message', function () {
    const message = 'mintbar';
    const renderedValue = renderValue(undefined, message);

    if (typeof renderedValue != 'string' && typeof renderedValue != 'number') {
      const { getByText } = render(renderedValue);

      getByText(message)
    }
  });
})

