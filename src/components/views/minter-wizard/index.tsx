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

import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Form, FormikProps, FormikState, FormikValues } from 'formik';
import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';

import { FormWizardSteps, HomepageContext } from '@utils/context/HomepageContext';
import { initialValues, WizardValues } from '@utils/const/minter-wizard';
import { MintTypes } from '@utils/entity/MinterWizard'
import Welcome from '@components/views/minter-wizard/Welcome';
import wizardSteps from '@components/views/minter-wizard/steps';
import MinterWizardStepWrapper from '@components/shared/minter-wizard/StepWrapper';
import MinterWizardSummary from '@components/shared/minter-wizard/summary';
import FloatingLogos from '@components/shared/FloatingLogos'

type MinterWizardContextProps = {
  setCreatorStepToBackFromSummary: React.Dispatch<React.SetStateAction<number>>,
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>,
  setCreatorStepToBackFromSummaryToCurrent: () => void,
  creatorStepToBackFromSummary: number,
  showWarning: boolean,
}

export const MinterWizardContext = React.createContext<MinterWizardContextProps>({
  creatorStepToBackFromSummary: 0,
  showWarning: false,
  setCreatorStepToBackFromSummary: () => false,
  setCreatorStepToBackFromSummaryToCurrent: () => false,
  setShowWarning: () => false,
})

export default function MinterWizardForm({
  values,
  resetForm
}: FormikProps<FormikValues>) {
  const [creatorStepToBackFromSummary, setCreatorStepToBackFromSummary] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const { creatorStep, setCreatorStep } = useContext(HomepageContext);
 
  const minterWizardSteps = useMemo(() => (
    wizardSteps[values.mint_type as MintTypes]
  ), [values.mint_type])

  const isFloatingLogosVisible = useMemo(() => (
    creatorStep === FormWizardSteps.WelcomeScreen
  ), [creatorStep])

  const setCreatorStepToBackFromSummaryToCurrent = useCallback(() => {
    if (creatorStepToBackFromSummary !== 0) {
      setCreatorStep(creatorStepToBackFromSummary)
    }
  }, [creatorStepToBackFromSummary, setCreatorStep])

  useEffect(() => {
    if (creatorStep === FormWizardSteps.WelcomeScreen) {
      setCreatorStepToBackFromSummary(0)
      resetForm({values: {...initialValues, mint_type: values.mint_type}} as Partial<FormikState<WizardValues>>)
    }
  }, [creatorStepToBackFromSummary, creatorStep, resetForm, values.mint_type])

  const renderFormWizard = useCallback((creatorStep: FormWizardSteps) => {
    switch (creatorStep) {
      case FormWizardSteps.WelcomeScreen:
        return <Welcome />

      case FormWizardSteps.MinterScreen:
        return (
          <MinterWizardStepWrapper steps={minterWizardSteps} />
        )

      case FormWizardSteps.SummaryScreen:
        return (
          <MinterWizardSummary />
        )
    }
  }, [minterWizardSteps])


  return (
    <MinterWizardContext.Provider
      value={{
        creatorStepToBackFromSummary,
        setCreatorStepToBackFromSummary,
        setCreatorStepToBackFromSummaryToCurrent,
        showWarning,
        setShowWarning
      }}
    >
      <Form className='minter-wizard__form' data-testid='minter-wizard-form'>
        <SwitchTransition mode='out-in'>
          <CSSTransition
            key={creatorStep}
            timeout={500}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false);
            }}
            classNames={'fade'}
          >
            {renderFormWizard(creatorStep)}
          </CSSTransition>
        </SwitchTransition>
      </Form>

      <FloatingLogos isVisible={isFloatingLogosVisible}/>
    </MinterWizardContext.Provider>
  );
}
