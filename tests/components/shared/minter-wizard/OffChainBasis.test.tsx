/** @jest-environment jsdom */
import React from 'react';
import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import OffChainBasis from '@components/shared/minter-wizard/OffChainBasis';
import { MintTypes } from '@utils/entity/MinterWizard';

describe('Fees', () => {
  it('render', () => {
    const fn = jest.fn(v => v);

    render(
      <Formik initialValues={{mint_type: MintTypes.ExistingCollectionNewNFT}} onSubmit={fn}>
        <OffChainBasis />
      </Formik>);
  })

});
