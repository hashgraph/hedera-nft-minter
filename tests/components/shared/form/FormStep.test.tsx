/** @jest-environment jsdom */
import React from 'react';
import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import FormStep from '@components/shared/form/FormStep';

describe('FormStep', () => {
  it('render', () => {

    render(
      <FormStep title='Summary' />
    )
  })

});
