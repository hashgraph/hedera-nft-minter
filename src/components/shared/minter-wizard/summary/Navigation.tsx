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

import React, { useCallback, useContext } from 'react'
import { FormikValues, useFormikContext } from 'formik';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';

import { FormWizardSteps, HomepageContext } from '@utils/context/HomepageContext';
import { MinterWizardContext } from '@components/views/minter-wizard'

export default function Navigation() {
  const { isSubmitting } = useFormikContext<FormikValues>()
  const { setCreatorStep } = useContext(HomepageContext)
  const {
    setShowWarning,
    showWarning,
  } = useContext(MinterWizardContext)

  const handleLeftArrowClick = useCallback(() => showWarning
    ? setShowWarning(false)
    : setCreatorStep(FormWizardSteps.MinterScreen)
  , [setCreatorStep, setShowWarning, showWarning])

  return (
    <div className='minter-wizard__creator__nav--summary'>
      <div className='prev'>
        <button
          className='btn--arrow-left'
          type='button'
          onClick={handleLeftArrowClick}
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
                Confirm
              </button>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}
