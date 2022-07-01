import React, { useEffect, useState } from 'react'
import useMinterWizard from '@/utils/hooks/useMinterWizard';
import { CreatorSteps } from '@/utils/entity/MinterWizard';
import SideSummary from '@/components/shared/minter-wizard/side-sumary';
import { useFormikContext } from 'formik';
import classNames from 'classnames';

type Props = {
  steps: CreatorSteps,
  backToMintTypeSelection: () => void;
}

export const MinterWizardStepWrapperContext = React.createContext<{
  setNextButtonHidden: React.Dispatch<React.SetStateAction<boolean>>
}>({
  setNextButtonHidden: () => false
})

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
    renderMinterWizardScreen,
  } = useMinterWizard(steps)

  const { isSubmitting } = useFormikContext()

  const [isNextButtonHidden, setNextButtonHidden] = useState(false)

  const nextButtonClassName = classNames('btn--big', {
    'btn--hidden': isNextButtonHidden
  })

  useEffect(() => {
    if(isFirstScreen) {
      setNextButtonHidden(false)
    }
  }, [isFirstScreen, setNextButtonHidden])

  return (
    <MinterWizardStepWrapperContext.Provider value={{setNextButtonHidden}}>
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
                type='submit'
                className={nextButtonClassName}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Finish in wallet' : 'Mint'}
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
