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

import React from 'react';
import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import SelectCollection from '@components/shared/minter-wizard/SelectCollection';
import { MinterWizardContext } from '@components/views/minter-wizard';
import HederaWalletsProvider from '@utils/context/HederaWalletsContext';
import useHederaWallets from '@utils/hooks/useHederaWallets';

jest.mock('hashconnect', () => {
  return {
    HashConnectTypes: {
      WalletMetadata: {},
      SavedPairingData: {}
    },
    HashConnect: jest.fn(() => ({
      init: () => ({
        topic: '',
        pairingString: '',
        encryptionKey: '',
        savedPairings: [],
      }),
      foundExtensionEvent: {
        on: jest.fn(),
        off: jest.fn(),
      },
      pairingEvent: {
        on: jest.fn(),
        off: jest.fn(),
      },
      foundIframeEvent: {
        on: jest.fn(),
        off: jest.fn(),
      }
    })),
  };
});
jest.mock('@utils/hooks/useHederaWallets');

describe('SelectCollection', () => {
  it('render', () => {
    (useHederaWallets as jest.Mock).mockReturnValue({ userWalletId: '0.0.7116'})
    const fn = jest.fn()
    const submit = jest.fn(v => v)

    render(
      <HederaWalletsProvider>
        <MinterWizardContext.Provider
          value={{
            showWarning: false,
            creatorStepToBackFromSummary: 0,
            setCreatorStepToBackFromSummary: fn,
            setCreatorStepToBackFromSummaryToCurrent: fn,
            setShowWarning: fn,
          }}
        >
          <Formik initialValues={{}} onSubmit={submit}>
            <SelectCollection />
          </Formik>
        </MinterWizardContext.Provider>
      </HederaWalletsProvider>
    );
  })

  it('render - empty userWalletId', () => {
    (useHederaWallets as jest.Mock).mockReturnValue({ userWalletId: null })
    const fn = jest.fn()
    const submit = jest.fn(v => v)

    render(
      <HederaWalletsProvider>
        <MinterWizardContext.Provider
          value={{
            showWarning: false,
            creatorStepToBackFromSummary: 0,
            setCreatorStepToBackFromSummary: fn,
            setCreatorStepToBackFromSummaryToCurrent: fn,
            setShowWarning: fn,
          }}
        >
          <Formik initialValues={{}} onSubmit={submit}>
            <SelectCollection />
          </Formik>
        </MinterWizardContext.Provider>
      </HederaWalletsProvider>
    );
  })
});
