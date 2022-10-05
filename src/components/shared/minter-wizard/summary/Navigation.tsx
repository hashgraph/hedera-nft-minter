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

import React, { useContext } from 'react'
import { FormikValues, useFormikContext } from 'formik';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';

import { MinterWizardContext } from '@/components/views/minter-wizard'

type SummaryNavigationProps = {
  goToCreator: () => void;
}

export default function Navigation({ goToCreator } : SummaryNavigationProps) {
  const { isSubmitting } = useFormikContext<FormikValues>()
  const {
    setShowWarning,
    showWarning,
  } = useContext(MinterWizardContext)

  return (
    <div className='minter-wizard__creator__nav--summary'>
      <div className='prev'>
        <button
          className='btn--arrow-left'
          type='button'
          onClick={showWarning ? () => setShowWarning(false) : goToCreator }
        >
          Back
        </button>
      </div>
      <div className='next'>
        <SwitchTransition>
          <CSSTransition
            key={showWarning ? 'warning' : 'submit'}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            classNames='fade'
          >
            {!showWarning ? (
              <button
                className='btn--arrow'
                type='button'
                onClick={() => setShowWarning(true)}
                disabled={isSubmitting}
              >
                Mint it!
              </button>
            ) : (
              <button
                className='btn--arrow-green'
                type='submit'
                disabled={isSubmitting}
              >
                YES! Mint it!
              </button>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}
