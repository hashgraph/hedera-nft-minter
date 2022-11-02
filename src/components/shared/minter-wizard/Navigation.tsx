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
import classNames from 'classnames';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import { toast } from 'react-toastify';

import MINTER_WIZARD_ERROR_MESSAGES from '@src/utils/const/minter-wizard-error-messages';
import { MinterWizardContext } from '@components/views/minter-wizard'
import { MinterWizardStepWrapperContext } from '@components/shared/minter-wizard/StepWrapper';

type NavigationProps = {
  backToMintTypeSelection: () => void;
  goToSummary: () => void;
  handleCreatorNextButton: React.MouseEventHandler<HTMLButtonElement>
  handleCreatorPrevButton: () => void;
  creatorStep: number;
  isFirstScreen: boolean,
  isLastScreen: boolean;
  checkIfAllFieldsAreValidated: () => boolean;
}

export default function Navigation({
  creatorStep,
  backToMintTypeSelection,
  goToSummary,
  isFirstScreen,
  isLastScreen,
  handleCreatorNextButton,
  handleCreatorPrevButton,
  checkIfAllFieldsAreValidated
} : NavigationProps) {

  const {
    setCreatorStepToBackFromSummary,
  } = useContext(MinterWizardContext)

  const {
    isNextButtonHidden,
  } = useContext(MinterWizardStepWrapperContext)

  const handleGoToSummary = useCallback(() => {
    const areFieldsValidated = checkIfAllFieldsAreValidated()

    if (!areFieldsValidated) {
      toast.error(MINTER_WIZARD_ERROR_MESSAGES.FIX_ERRORS)
    } else {
      if (creatorStep > 0) {
        setCreatorStepToBackFromSummary(creatorStep)
        goToSummary()
      }
    }
  }, [checkIfAllFieldsAreValidated, goToSummary, setCreatorStepToBackFromSummary, creatorStep])


  const nextButtonClassName = classNames('btn--arrow', {
    'btn--arrow--disabled': isNextButtonHidden,
    'minter-wizard__creator__btn--last-screen': isLastScreen,
  })

  const navClassName = classNames('minter-wizard__creator__nav', {
    'minter-wizard__creator__nav--first-screen': isFirstScreen
  })

  return (
    <div className={navClassName}>
      <div className='prev'>
        {isFirstScreen ? (
          <button
            type='button'
            onClick={backToMintTypeSelection}
            className='btn--arrow-left'
          >
            Back
          </button>
        ) : (
          <button
            type='button'
            disabled={isFirstScreen}
            onClick={handleCreatorPrevButton}
            className='btn--arrow-left'
          >
            Back
          </button>
        )}
      </div>

      <div className='next'>
        <SwitchTransition>
          <CSSTransition
            key={isLastScreen ? 'Mint it!' : 'Next'}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames='fade'
          >
            <span>
              {isLastScreen ? (
                <button
                  type='button'
                  className={nextButtonClassName}
                  onClick={isLastScreen && handleGoToSummary}
                  disabled={isNextButtonHidden}
                >
                  Mint it!
                </button>
              ) : (
                <button
                  type='button'
                  className={nextButtonClassName}
                  onClick={!isLastScreen && handleCreatorNextButton}
                  disabled={isLastScreen}
                >
                  Next
                </button>
              )}
            </span>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
