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

import React from 'react'
import { FormikValues, useFormikContext } from 'formik';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';

import SummaryContent from '@components/shared/minter-wizard/summary/Content'
import SummaryNavigation from '@components/shared/minter-wizard/summary/Navigation'
import SummaryProcessing from '@components/shared/minter-wizard/summary/Processing';

export default function MinterWizardSummary() {
  const { isSubmitting } = useFormikContext<FormikValues>()

  return (
    <>
      <div className='minter-wizard__animation-container'>
        <div className='minter-wizard__summary'>
          <SwitchTransition>
            <CSSTransition
              key={isSubmitting ? 'submitting' : 'waiting'}
              addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
              classNames='fade'
            >
              {isSubmitting ? (
                <SummaryProcessing />
              ) : (
                <>
                  <SummaryContent />
                  <SummaryNavigation />
                </>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </>
  )
}
