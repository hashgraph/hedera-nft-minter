import React from 'react'
import SideSummary from '@/components/shared/minter-wizard/side-sumary';
import useMinterWizard, { WizardScreen } from '@/utils/hooks/useMinterWizard';

type Props = {
  steps: WizardScreen[]
}

export default function MinterWizardStepWrapper({steps} : Props) {
  const {
    step,
    isFirstScreen,
    isLastScreen,
    handleNextButton,
    handlePrevButton,
    renderMinterWizardScreen
  } = useMinterWizard(steps)

  return (
    <div className='minter-wizard__step__container'>
      <div className='minter-wizard__step__creator'>

        {renderMinterWizardScreen(step)}

        <button
          type='button'
          disabled={isFirstScreen}
          onClick={handlePrevButton}
        >
          Prev
        </button>

        {!isLastScreen && (
          <button
            type='button'
            onClick={handleNextButton}
          >
            Next
          </button>
        )}
      </div>

      <SideSummary />
    </div>
  )
}
