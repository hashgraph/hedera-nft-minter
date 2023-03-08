/** @jest-environment jsdom */

/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { Formik } from 'formik';
import Navigation from '@components/shared/minter-wizard/Navigation';
import { MinterWizardContext } from '@components/views/minter-wizard';
import useHederaWallets from '@utils/hooks/useHederaWallets';
import HederaWalletsProvider from '@utils/context/HederaWalletsContext';

jest.mock('@utils/hooks/useHederaWallets');

describe('Minter Wizard - navigation', () => {
  it('render', () => {
    (useHederaWallets as jest.Mock).mockReturnValue({ userWalletId: '0.0.123456'})
    const fn = jest.fn()
    const fnTrue = jest.fn( () => true );
    const submit = jest.fn(v => v)
    const props = {
      handleCreatorNextButton: fn,
      handleCreatorPrevButton: fn,
      creatorStep: 1,
      isFirstScreen: false,
      isLastScreen: false,
      checkIfAllFieldsAreValidated: fnTrue,
    }

    render(
      <HederaWalletsProvider>
        <MinterWizardContext.Provider
          value={{
            showWarning: false,
            creatorStepToBackFromSummary: 0,
            setCreatorStepToBackFromSummary: fn,
            setCreatorStepToBackFromSummaryToCurrent: fn,
            setShowWarning: fn,
            setCollections: fn,
            collections: [],
          }}
        >
          <Formik initialValues={{}} onSubmit={submit}>
            <Navigation {...props} />
          </Formik>
        </MinterWizardContext.Provider>
      </HederaWalletsProvider>
    );
  })

});
