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

import { beforeEach, describe, it, jest, expect } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import ModalProvider, { ModalContext } from '@utils/context/ModalContext';
import { useContext } from 'react';
import { act } from 'react-dom/test-utils';

describe('ModalContext', () => {
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
    render(
      <ModalProvider>
        <div>Test</div>
      </ModalProvider>
    )
  })

  it('render', () => {
    const TestComponent = () => {
      const {showModal, closeModal, isModalShowed} = useContext(ModalContext);

      return (
        <div>
          <button type='button' onClick={showModal}>ShowModal</button>
          <button type='button' onClick={closeModal}>CloseModal</button>
          {isModalShowed && <div>TEST</div>}
        </div>
      )
    }

    const { getByText, queryByText } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    )

    act(() => {
      fireEvent.click(
        getByText('ShowModal'),
      )
    })

    expect(getByText('TEST').tagName).toBe('DIV')

    act(() => {
      fireEvent.click(
        getByText('CloseModal'),
      )
    });

    expect(queryByText('TEST')).toBeNull();
  })

});
