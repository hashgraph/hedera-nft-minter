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
import MyNFTCollection from '@pages/my-nft-collection';
import useHederaWallets from '@utils/hooks/useHederaWallets';

jest.mock('@utils/hooks/useHederaWallets');

describe('MyNFTCollection', () => {
  it('render', () => {
    (useHederaWallets as jest.Mock).mockReturnValue({ userWalletId: null })

    render(
      <MyNFTCollection />
    )
  })

  it('render - moc user account', () => {
    (useHederaWallets as jest.Mock).mockReturnValue({ userWalletId: '0.0.2661933'})

    render(<MyNFTCollection />);
  })

});
