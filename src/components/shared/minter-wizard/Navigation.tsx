import React, { useCallback, useContext } from 'react'
import classNames from 'classnames';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';

import { MinterWizardContext } from '@/components/views/minter-wizard'
import { MinterWizardStepWrapperContext } from '@/components/shared/minter-wizard/StepWrapper';

type NavigationProps = {
  backToMintTypeSelection: () => void;
  goToSummary: () => void;
  handleCreatorNextButton: React.MouseEventHandler<HTMLButtonElement>
  handleCreatorPrevButton: () => void;
  creatorStep: number;
  isFirstScreen: boolean,
  isLastScreen: boolean;

}

export default function Navigation({
  creatorStep,
  backToMintTypeSelection,
  goToSummary,
  isFirstScreen,
  isLastScreen,
  handleCreatorNextButton,
  handleCreatorPrevButton,
} : NavigationProps) {

  const {
    setCreatorStepToBackFromSummary,
  } = useContext(MinterWizardContext)

  const {
    isNextButtonHidden,
  } = useContext(MinterWizardStepWrapperContext)

  const handleGoToSummary = useCallback(() => {
    if(creatorStep > 0) {
      setCreatorStepToBackFromSummary(creatorStep)
      goToSummary()
    }
  }, [goToSummary, setCreatorStepToBackFromSummary, creatorStep])


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
