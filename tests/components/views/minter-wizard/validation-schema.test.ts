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

import { describe, expect, it } from '@jest/globals';
import { ValidationSchema } from '@components/views/minter-wizard/validation-schema';
import { MintTypes } from '@utils/entity/MinterWizard';
import { FEE } from '@utils/entity/Fees';

describe('ValidationSchema', () => {
  it('image', () => {
    expect(ValidationSchema.validateAt('image', { image: 'test'})).toBeTruthy();
  });

  it('image - object', () => {
    expect(ValidationSchema.validateAt('image', { image: { type: 'image/png' }})).toBeTruthy();
  });

  it('name', () => {
    expect(ValidationSchema.validateAt('name', { name: 'test'})).toBeTruthy();
  });

  it('edition_name', () => {
    expect(ValidationSchema.validateAt('edition_name', { edition_name: 'test'})).toBeTruthy();
  });

  it('symbol', () => {
    expect(ValidationSchema.validateAt('symbol', { symbol: 'test'})).toBeTruthy();
  });

  it('creator', () => {
    expect(ValidationSchema.validateAt('creator', { creator: 'test'})).toBeTruthy();
  });

  it('description', () => {
    expect(
      ValidationSchema.validateAt('description', { description: 'test' })
    ).toBeTruthy();
  });

  it('qty', () => {
    expect(
      ValidationSchema.validateAt('qty', { qty: 10, mint_type: MintTypes.ExistingCollectionNewNFT })
    ).toBeTruthy();
  });

  it('qty - new', () => {
    expect(
      ValidationSchema.validateAt('qty', { qty: 10, mint_type: MintTypes.NewCollectionNewNFT })
    ).toBeTruthy();
  });

  it('maxSupply', () => {
    expect(
      ValidationSchema.validateAt('maxSupply', { maxSupply: 0, mint_type: MintTypes.ExistingCollectionNewNFT })
    ).toBeTruthy();
  });

  it('maxSupply', () => {
    expect(
      ValidationSchema.validateAt('maxSupply', { maxSupply: 2, mint_type: MintTypes.NewCollectionNewNFT })
    ).toBeTruthy();
  });

  it('token_id', () => {
    expect(
      ValidationSchema.validateAt('token_id', { token_id: '0.0.123456', mint_type: MintTypes.ExistingCollectionNewNFT })
    ).toBeTruthy();
  });

  it('treasuryAccountId', () => {
    expect(
      ValidationSchema.validateAt('treasuryAccountId', { treasuryAccountId: [{
        type: 'test', value: 'custom', key: 'test'
        }], mint_type: MintTypes.ExistingCollectionNewNFT })
    ).toBeTruthy();
  });

  it('attributes', () => {
    expect(
      ValidationSchema.validateAt('attributes', { attributes: [{
        trait_type: 'foo', value: 'bar'
        }]})
    ).toBeTruthy();
  });

  it('attributes - empty', () => {
    expect(
      ValidationSchema.validateAt('attributes', { attributes: [{
        trait_type: ''
        }]})
    ).toBeTruthy();
  });

  it('properties', () => {
    expect(
      ValidationSchema.validateAt('properties', { properties: [{
        label: 'foo', value: 'bar'
        }]})
    ).toBeTruthy();
  });

  it('properties -empty value', () => {
    expect(
      ValidationSchema.validateAt('properties', { properties: [{
        label: '', value: ''
        }]})
    ).toBeTruthy();
  });

  it('fees', () => {
    expect(
      ValidationSchema.validateAt('fees', { fees: [
        { type: FEE.FIXED, amount: 10 },
        { type: FEE.ROYALTY, feeCollectorAccountId: '0.0.123456', percent: 10, fallbackFee: 2 },
      ]})
    ).toBeTruthy();
  });



});
