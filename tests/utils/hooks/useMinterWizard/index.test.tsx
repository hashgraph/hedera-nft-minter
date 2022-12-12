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

import { describe, it, expect, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { Formik } from 'formik';
import useMinterWizard from '@utils/hooks/useMinterWizard';
import NewCollectionNewNftSteps from '@components/views/minter-wizard/steps/new-collection-new-nft';
import HederaWalletsProvider from '@utils/context/HederaWalletsContext';
import { JSX } from '@babel/types';

describe('useMinterWizard', () => {
  it('render', async () => {
    const submit = jest.fn(v => v);
    const wrapper = ({ children }: { children: JSX.Element}) => (
      <HederaWalletsProvider>
        <Formik initialValues={{}} onSubmit={submit}>
          {children}
        </Formik>
      </HederaWalletsProvider>
    )
    const { result } = renderHook(() => useMinterWizard(NewCollectionNewNftSteps), { wrapper });

    expect(result.current.creatorStep).toEqual(0);
    expect(result.current.isFirstScreen).toEqual(true);
    expect(result.current.isLastScreen).toEqual(false);
  })

});
