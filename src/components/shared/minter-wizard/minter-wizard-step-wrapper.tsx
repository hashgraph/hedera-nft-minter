import React from 'react'
import useMinterWizard from '@/utils/hooks/useMinterWizard';
import { CreatorSteps } from '@/utils/entity/MinterWizard';
import SideSummary from '@/components/shared/minter-wizard/side-sumary';

type Props = {
  steps: CreatorSteps,
  backToMintTypeSelection: () => void;
}

export default function MinterWizardStepWrapper({
  steps,
  backToMintTypeSelection
} : Props) {
  const {
    creatorStep,
    isFirstScreen,
    isLastScreen,
    handleCreatorNextButton,
    handleCreatorPrevButton,
    renderMinterWizardScreen
  } = useMinterWizard(steps)

  return (
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
            >
                Minting type
            </button>
          ) : (
            <button
              type='button'
              disabled={isFirstScreen}
              onClick={handleCreatorPrevButton}
            >
              Prev
            </button>
          )}
        </div>

        <div className='next'>
          {isLastScreen ? (
            <button type='submit'>Mint</button>
          ) : (
            <button
              type='button'
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
  )
}
