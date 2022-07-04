import React, { useCallback, useEffect, useState, useContext } from 'react'
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

  const { setLastCreatorStep, lastCreatorStep } = useContext(MinterWizardContext)

  const handleSummaryNextButton = useCallback(() => {
    setLastCreatorStep(creatorStep)
    goToSummary()
  }, [goToSummary, setLastCreatorStep, creatorStep])

  useEffect(() => {
    if(lastCreatorStep !== 0) {
      setCreatorStep(lastCreatorStep)
    }
  }, [lastCreatorStep, setCreatorStep])

  const [isNextButtonHidden, isNextButtonActive] = useState(false)

  const nextButtonClassName = classNames('btn--big', {
    'btn--hidden': isNextButtonHidden
  })

  useEffect(() => {
    if(isFirstScreen) {
      isNextButtonActive(false)
    }
  }, [isFirstScreen, isNextButtonActive])

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
