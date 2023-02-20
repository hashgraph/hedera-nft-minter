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

import React, { useCallback, useEffect, useState, useContext, useMemo } from 'react'

import useMinterWizard from '@utils/hooks/useMinterWizard';
import { CreatorSteps } from '@utils/entity/MinterWizard';

import { MinterWizardContext } from '@components/views/minter-wizard'
import Slider, { SliderTabData } from '@components/shared/minter-wizard/Slider';
import Navigation from '@components/shared/minter-wizard/Navigation';

type Props = {
  steps: CreatorSteps,
}

export const MinterWizardStepWrapperContext = React.createContext<{
  setNextButtonHidden: React.Dispatch<React.SetStateAction<boolean>>,
  isNextButtonHidden: boolean;
}>({
  setNextButtonHidden: () => false,
  isNextButtonHidden: false,
})

export default function MinterWizardStepWrapper({ steps } : Props) {
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
    if (wasUserBackFromSummary && minterWizardProps?.creatorStep === 0) {
      setCreatorStep(creatorStepToBackFromSummary)

      setCreatorStepToBackFromSummary(0)
    }
  }, [wasUserBackFromSummary, creatorStepToBackFromSummary, minterWizardProps?.creatorStep, setCreatorStep, setCreatorStepToBackFromSummary])

  useEffect(() => {
    handleBackFromWizardSummary()
  }, [handleBackFromWizardSummary])

  useEffect(() => {
    if (minterWizardProps.isFirstScreen) {
      setNextButtonHidden(false)
    }
  }, [minterWizardProps.isFirstScreen, setNextButtonHidden])


  return (
    <MinterWizardStepWrapperContext.Provider value={{isNextButtonHidden, setNextButtonHidden}}>
      <div className='minter-wizard__creator minter-wizard__animation-container'>
        <div className='minter-wizard__creator__form'>
          <Slider
            activeIndex={minterWizardProps.creatorStep}
            data={steps?.map(step => ({
              key: `minter-wizard.step-${ step.creatorStep }`,
              content: step.Component,
            })) as SliderTabData[]}
          />
        </div>

        <Navigation {...minterWizardProps} />
      </div>
    </MinterWizardStepWrapperContext.Provider>
  )
}
