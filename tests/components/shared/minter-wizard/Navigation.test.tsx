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

import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { Formik } from 'formik';
import Navigation from '@components/shared/minter-wizard/Navigation';
import MinterWizardForm from '@components/views/minter-wizard';

describe('Minter Wizard - navigation', () => {
  it('render', () => {
    const fn = jest.fn();
    const submit = jest.fn(v => v);

    const props = {
      backToMintTypeSelection: fn,
      goToSummary: fn,
      handleCreatorNextButton: fn,
      handleCreatorPrevButton: fn,
      creatorStep: 1,
      isFirstScreen: false,
      isLastScreen: false,
    }

    render(
      <Formik initialValues={{}} onSubmit={submit}>
        {formProps => (
          <MinterWizardForm {...formProps}>
            <Navigation {...props} />
          </MinterWizardForm>
        )}
      </Formik>
    );
  });

});
