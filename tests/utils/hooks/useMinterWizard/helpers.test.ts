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

import { describe, expect, it, jest } from '@jest/globals';
import {
  getCurrentStepFieldsNames,
  checkIfFieldsAreValidated,
  checkIfFieldsRequireConnectedWallet
} from '@utils/hooks/useMinterWizard/helpers';
import { MintTypes } from '@utils/entity/MinterWizard';

describe('useMinterWizard helpers', () => {
  it('getCurrentStepFieldsNames', () => {
    const fieldsForValidation = getCurrentStepFieldsNames(MintTypes.NewCollectionNewNFT, 0);

    expect(fieldsForValidation).toEqual(['maxSupply', 'qty'])
  })

  it('getCurrentStepFieldsNames', () => {
    const fieldsForValidation = getCurrentStepFieldsNames(MintTypes.NewCollectionNewNFT, 1);

    expect(fieldsForValidation).toEqual(['maxSupply', 'qty', 'name', 'symbol', 'edition_name', 'description', 'creator'])
  })

  it('checkIfFieldsAreValidated', () => {
    const fn = jest.fn()
    const tmp = checkIfFieldsAreValidated(
      ['maxSupply', 'qty'],
      fn,
      fn,
      { maxSupply: 10, qty: 10 },
      {}
    );

    expect(tmp).toBe(true)
  });

  it('checkIfFieldsAreValidated - with error', () => {
    const fn = jest.fn()
    const tmp = checkIfFieldsAreValidated(
      ['maxSupply', 'qty'],
      fn,
      fn,
      { maxSupply: 10, qty: 10 },
      { maxSupply: 'error' }
    );

    expect(tmp).toBe(false)
  });

  it('checkIfFieldsRequireConnectedWallet', () => {
    const tmp = checkIfFieldsRequireConnectedWallet(MintTypes.NewCollectionNewNFT, 0);

    expect(tmp).toBe(false)
  });
  it('checkIfFieldsRequireConnectedWallet - true', () => {
    const tmp = checkIfFieldsRequireConnectedWallet(MintTypes.NewCollectionNewNFT, 3);

    expect(tmp).toBe(true)
  });

})

