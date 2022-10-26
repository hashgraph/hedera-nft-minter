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
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import Summary from '@components/views/minter-wizard/Summary';

describe('Summary', () => {
  it('render', () => {
    render(
      <Router>
        <Summary
          mintedNFTData={{
            name: 'name',
            symbol: 'symbol',
            edition_name: 'edition name',
            creator: 'tester',
            description: 'lorem ipsum...'
          }}
        />
      </Router>
    )
  })

});
