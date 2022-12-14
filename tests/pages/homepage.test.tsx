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
import { describe, it, beforeEach, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import Homepage from '@pages/homepage';

describe('Homepage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  })

  it('render', () => {
    render(<Homepage />);
  })

  // it('submitForm', () => {
    // let getByTestId: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement;

    // act(() => {
    //   ReactDom.createRoot().render(
    //     <LayoutProvider>
    //       <ModalProvider>
    //         <HederaWalletsProvider>
    //           <Router>
    //             <Homepage />
    //           </Router>
    //         </HederaWalletsProvider>
    //       </ModalProvider>
    //     </LayoutProvider>
    //   )
    //
    //   const form = getByTestId('minter-wizard-form');
    //
    //   // act(() => {
    //   // fireEvent.submit(form, {});
    //   // });
    //
    // });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const form = getByTestId('minter-wizard-form');
    //
    // act(() => {
    //   fireEvent.submit(form, {});
    // });
  // })

});
