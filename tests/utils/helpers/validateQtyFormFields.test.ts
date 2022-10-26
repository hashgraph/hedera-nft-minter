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

import { describe, expect, it } from '@jest/globals';
import validateQtyFormField from '@utils/helpers/validateQtyFormField';
import * as yup from 'yup';

describe('validateQtyFormField', () => {
  it('should be value', () => {
    const numValidation = validateQtyFormField(10, yup.number());

    expect(numValidation.validateSync(5)).toBe(5)
  })

  it('should be max', () => {
    const numValidation = validateQtyFormField(10, yup.number());

    expect(() => numValidation.validateSync(11)).toThrow(yup.ValidationError)
  })

  it('should be max 10', () => {
    const numValidation = validateQtyFormField(15, yup.number());

    expect(() => numValidation.validateSync(11)).toThrow(yup.ValidationError)
  })

})

