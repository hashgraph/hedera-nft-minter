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
import StepWrapper from '@components/shared/minter-wizard/StepWrapper';
import { MinterWizardContext } from '@components/views/minter-wizard';
import wizardSteps from '@components/views/minter-wizard/steps';
import { MintTypes } from '@utils/entity/MinterWizard';
import { Formik } from 'formik';

describe('Fees', () => {
   it('render', () => {
    const fn = jest.fn()
    const submit = jest.fn(v => v)

    render(
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
        <Formik initialValues={{ attributes: [], properties: [], fees: [], keys: [] }} onSubmit={submit}>
          <StepWrapper steps={wizardSteps[MintTypes.NewCollectionNewNFT]} />
        </Formik>
      </MinterWizardContext.Provider>
    );
  })

});
