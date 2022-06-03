import React from 'react'
import SideSummary from '@/components/shared/minter-wizard/side-sumary';

type Props = {
  children: React.ReactNode;
  isFirstScreen: boolean;
  isLastScreen: boolean;
  handlePrevButton: () => void;
  handleNextButton: () => void;
}

export default function MinterWizardStepWrapper({
  children,
  isFirstScreen,
  isLastScreen,
  handlePrevButton,
  handleNextButton
}: Props) {
  return (
    <div className='minter-wizard__step__container'>
      <div className='minter-wizard__step__creator'>

        {children}

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
