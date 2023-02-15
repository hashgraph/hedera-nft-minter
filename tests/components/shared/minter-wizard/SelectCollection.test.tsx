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
import { TokenSupplyType } from '@utils/entity/TokenInfo';

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
            setCollections: fn,
            collections: [],
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
            setCollections: fn,
            collections: [
              {
                nfts: [
                  {
                    account_id: '0.0.123456',
                    created_timestamp: '11213123.2212',
                    deleted: false,
                    metadata: '12903812903812093',
                    modified_timestamp: '123123.21321312',
                    serial_number: 0,
                    token_id: '0.0.654321',
                    meta: { name: 'test' },
                    spender: null,
                  }
                ],
                info: {
                  admin_key: null,
                  auto_renew_account: null,
                  auto_renew_period: null,
                  created_timestamp: '1660719957.665494003',
                  decimals: 0,
                  deleted: false,
                  expiry_timestamp: '1660720991592000000',
                  fee_schedule_key: null,
                  freeze_default: false,
                  freeze_key: null,
                  initial_supply: '0',
                  kyc_key: null,
                  max_supply: '10',
                  name: 'AVATAR',
                  pause_key: null,
                  pause_status: 'NOT_APPLICABLE',
                  supply_key: { _type: 'ED25519', key: '3d9639fcb8137a17c0e0aba20a7fb5038f74269835ef32d3891415008e4db8d2' },
                  supply_type: TokenSupplyType.FINITE,
                  symbol: 'PM-AV',
                  token_id: '0.0.47909758',
                  total_supply: '4',
                  treasury_account_id: '0.0.2661933',
                  type: 'NON_FUNGIBLE_UNIQUE',
                  wipe_key: null
                }
              }
            ],
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
