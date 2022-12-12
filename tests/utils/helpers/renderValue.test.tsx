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

