import React, { useCallback, useEffect, useState, useContext, useMemo } from 'react'
import classNames from 'classnames';
import useMinterWizard from '@/utils/hooks/useMinterWizard';
import { CreatorSteps } from '@/utils/entity/MinterWizard';
import SideSummary from '@/components/shared/minter-wizard/summary/SideSummary';
import { FormWizardSteps, MinterWizardContext } from '@/components/shared/minter-wizard/MinterWizardForm'
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';

import generateMultipleTransitionGroupClassNames from '@/utils/helpers/generateMultipleTransitionGroupClassNames';
import useLayout from "@utils/hooks/useLayout";

type Props = {
  steps: CreatorSteps,
  backToMintTypeSelection: () => void;
  goToSummary: () => void;
  isActive: boolean
}

export const MinterWizardStepWrapperContext = React.createContext<{
  isNextButtonActive: React.Dispatch<React.SetStateAction<boolean>>,
  isFirstScreen: boolean;
}>({
  isNextButtonActive: () => false,
  isFirstScreen: false
})

export default function MinterWizardStepWrapper({
  steps,
  backToMintTypeSelection,
  goToSummary,
} : Props) {
  const {
    creatorStep,
    isFirstScreen,
    isLastScreen,
    handleCreatorNextButton,
    handleCreatorPrevButton,
    renderMinterWizardScreen,
    setCreatorStep
  } = useMinterWizard(steps)

  const {
    setCreatorStepToBackFromSummary,
    creatorStepToBackFromSummary
  } = useContext(MinterWizardContext)

  const [isNextButtonHidden, isNextButtonActive] = useState(false)

  const handleSummaryNextButton = useCallback(() => {
    if(creatorStep > 0) {
      setCreatorStepToBackFromSummary(creatorStep)
      goToSummary()
    }
  }, [goToSummary, setCreatorStepToBackFromSummary, creatorStep])

  const wasUserBackFromSummary = useMemo(() =>
     creatorStepToBackFromSummary !== 0,
  [creatorStepToBackFromSummary])

  const handleBackFromWizardSummary = useCallback(() => {
    if(wasUserBackFromSummary && creatorStep === 0) {
      setCreatorStep(creatorStepToBackFromSummary)

      setCreatorStepToBackFromSummary(0)
    }
  }, [wasUserBackFromSummary, creatorStepToBackFromSummary, setCreatorStep, creatorStep, setCreatorStepToBackFromSummary])

  useEffect(() => {
    handleBackFromWizardSummary()
  }, [handleBackFromWizardSummary])

  useEffect(() => {
    if(isFirstScreen) {
      isNextButtonActive(false)
    }
  }, [isFirstScreen, isNextButtonActive])


  const nextButtonClassName = classNames('btn--arrow', {
    'btn--hidden': isNextButtonHidden,
    'minter-wizard__creator__btn--last-screen': isLastScreen,
  })

  const navClassName = classNames('minter-wizard__creator__nav', {
    'minter-wizard__creator__nav--first-screen': isFirstScreen
  })

  return (
    <MinterWizardStepWrapperContext.Provider value={{isNextButtonActive}}>
      <div className='minter-wizard__creator minter-wizard__animation-container container--padding'>
        <div className='minter-wizard__creator__form'>
          {renderMinterWizardScreen(creatorStep)}
        </div>

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
            {/* <button
              type='button'
              className={nextButtonClassName}
              disabled={isNextButtonHidden}
              onClick={isLastScreen ? handleSummaryNextButton : handleCreatorNextButton}
            > */}
              <SwitchTransition>
                <CSSTransition
                  key={isLastScreen ? 'Mint it!' : 'Next'}
                  addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
                  classNames='fade'
                >
                  <span>
                    {isLastScreen ? (
                      <button
                        type='button'
                        className={nextButtonClassName}
                        onClick={isLastScreen && handleSummaryNextButton}
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

            {/* </button> */}
            {/* {isLastScreen ? (
              <button
                type='button'
                className={nextButtonClassName}
                onClick={handleSummaryNextButton}
              >
                Summary
              </button>
            ) : (
            )} */}
          </div>
        </div>
{/*
        <div className='minter-wizard__creator__summary'>
          <SideSummary step={creatorStep} />
        </div> */}
      </div>
    </MinterWizardStepWrapperContext.Provider>
  )
}
