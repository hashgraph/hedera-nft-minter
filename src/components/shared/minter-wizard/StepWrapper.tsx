import React, { useCallback, useEffect, useState, useContext, useMemo } from 'react'
import classNames from 'classnames';
import useMinterWizard from '@/utils/hooks/useMinterWizard';
import { CreatorSteps } from '@/utils/entity/MinterWizard';
import SideSummary from '@/components/shared/minter-wizard/summary/SideSummary';
import { MinterWizardContext } from '@/components/shared/minter-wizard/MinterWizardForm'

type Props = {
  steps: CreatorSteps,
  backToMintTypeSelection: () => void;
  goToSummary: () => void;
}

export const MinterWizardStepWrapperContext = React.createContext<{
  isNextButtonActive: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isNextButtonActive: () => false
})

export default function MinterWizardStepWrapper({
  steps,
  backToMintTypeSelection,
  goToSummary
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
    setCreatorStepToBackFromSummary(creatorStep)
    goToSummary()
  }, [goToSummary, setCreatorStepToBackFromSummary, creatorStep])

  const wasUserBackFromSummary = useMemo(() =>
     creatorStepToBackFromSummary !== 0,
  [creatorStepToBackFromSummary])

  const handleBackFromWizardSummary = useCallback(() => {
    if(wasUserBackFromSummary) {
      setCreatorStep(creatorStepToBackFromSummary)
    }
  },[creatorStepToBackFromSummary, setCreatorStep, wasUserBackFromSummary])

  useEffect(() => {
    handleBackFromWizardSummary()
  }, [handleBackFromWizardSummary])

  useEffect(() => {
    if(isFirstScreen) {
      isNextButtonActive(false)
    }
  }, [isFirstScreen, isNextButtonActive])

  const nextButtonClassName = classNames('btn--big', {
    'btn--hidden': isNextButtonHidden
  })

  return (
    <MinterWizardStepWrapperContext.Provider value={{isNextButtonActive}}>
      <div className='minter-wizard__creator'>
        <div className='minter-wizard__creator__form'>
          {renderMinterWizardScreen(creatorStep)}
        </div>

        <div className='minter-wizard__creator__nav'>
          <div className='prev'>
            {isFirstScreen ? (
              <button
                type='button'
                onClick={backToMintTypeSelection}
                className='btn--big'
              >
                Back
              </button>
            ) : (
              <button
                type='button'
                disabled={isFirstScreen}
                onClick={handleCreatorPrevButton}
                className='btn--big'
              >
                Back
              </button>
            )}
          </div>

          <div className='next'>
            {isLastScreen ? (
              <button
                type='button'
                className={nextButtonClassName}
                onClick={handleSummaryNextButton}
              >
                Summary
              </button>
            ) : (
              <button
                type='button'
                className={nextButtonClassName}
                disabled={isNextButtonHidden}
                onClick={handleCreatorNextButton}
              >
                Next
              </button>
            )}
          </div>
        </div>

        <div className='minter-wizard__creator__summary'>
          <SideSummary step={creatorStep} />
        </div>
      </div>
    </MinterWizardStepWrapperContext.Provider>
  )
}
