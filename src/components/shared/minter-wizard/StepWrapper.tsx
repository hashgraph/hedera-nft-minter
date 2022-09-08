import React, { useCallback, useEffect, useState, useContext, useMemo } from 'react'

import useMinterWizard from '@/utils/hooks/useMinterWizard';
import { CreatorSteps } from '@/utils/entity/MinterWizard';

import { MinterWizardContext } from '@/components/views/minter-wizard'
import Slider from '@/components/shared/minter-wizard/Slider';
import Navigation from './Navigation';


type Props = {
  steps: CreatorSteps,
  backToMintTypeSelection: () => void;
  goToSummary: () => void;
}

export const MinterWizardStepWrapperContext = React.createContext<{
  setNextButtonHidden: React.Dispatch<React.SetStateAction<boolean>>,
  isNextButtonHidden: boolean;
}>({
  setNextButtonHidden: () => false,
  isNextButtonHidden: false,
})

export default function MinterWizardStepWrapper({
  steps,
  backToMintTypeSelection,
  goToSummary
} : Props) {
  const {
    setCreatorStep,
    ...minterWizardProps
  } = useMinterWizard(steps)

  const {
    setCreatorStepToBackFromSummary,
    creatorStepToBackFromSummary
  } = useContext(MinterWizardContext)

  const [isNextButtonHidden, setNextButtonHidden] = useState(false)

  const wasUserBackFromSummary = useMemo(() =>
     creatorStepToBackFromSummary !== 0,
  [creatorStepToBackFromSummary])

  const handleBackFromWizardSummary = useCallback(() => {
    if(wasUserBackFromSummary && minterWizardProps.creatorStep === 0) {
      setCreatorStep(creatorStepToBackFromSummary)

      setCreatorStepToBackFromSummary(0)
    }
  }, [wasUserBackFromSummary, creatorStepToBackFromSummary, setCreatorStep, minterWizardProps.creatorStep, setCreatorStepToBackFromSummary])

  useEffect(() => {
    handleBackFromWizardSummary()
  }, [handleBackFromWizardSummary])

  useEffect(() => {
    if(minterWizardProps.isFirstScreen) {
      setNextButtonHidden(false)
    }
  }, [minterWizardProps.isFirstScreen, setNextButtonHidden])


  return (
    <MinterWizardStepWrapperContext.Provider value={{isNextButtonHidden, setNextButtonHidden}}>
      <div className='minter-wizard__creator minter-wizard__animation-container'>
        <div className='minter-wizard__creator__form'>
          <Slider
            activeIndex={minterWizardProps.creatorStep}
            data={steps.map(step => ({
              key: `minter-wizard.step-${ step.creatorStep }`,
              content: step.Component,
            }))}
          />
        </div>

        <Navigation
          goToSummary={goToSummary}
          backToMintTypeSelection={backToMintTypeSelection}
          {...minterWizardProps}
        />
      </div>
    </MinterWizardStepWrapperContext.Provider>
  )
}
