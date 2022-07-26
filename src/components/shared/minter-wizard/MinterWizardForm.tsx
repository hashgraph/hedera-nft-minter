import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, FormikProps, FormikValues } from 'formik';

import { MintTypes } from '@utils/entity/MinterWizard'
import Welcome from '@/components/views/minter-wizard/Welcome';
import wizardSteps from '@components/views/minter-wizard/wizard-steps';
import MinterWizardStepWrapper from '@/components/shared/minter-wizard/StepWrapper';
import MinterWizardSummary from '@/components/shared/minter-wizard/summary';

export enum FormWizardSteps {
  WelcomeScreen = 0,
  MinterScreen = 1,
  SummaryScreen = 2,
}

export const MinterWizardContext = React.createContext<{
  setCreatorStepToBackFromSummary: React.Dispatch<React.SetStateAction<number>>,
  setCreatorStepToBackFromSummaryToCurrent: () => void,
  creatorStepToBackFromSummary: number
}>({
  creatorStepToBackFromSummary: 0,
  setCreatorStepToBackFromSummary: () => false,
  setCreatorStepToBackFromSummaryToCurrent: () => false
})

export default function MinterWizardForm({
  values,
}: FormikProps<FormikValues>) {
  const [creatorStep, setCreatorStep] = useState(FormWizardSteps.WelcomeScreen);
  const [creatorStepToBackFromSummary, setCreatorStepToBackFromSummary] = useState(0)

  const minterWizardSteps = useMemo(() => (
    wizardSteps[values.mint_type as MintTypes]
  ), [values.mint_type])

  const backToMintTypeSelection = useCallback(() => (
    setCreatorStep(FormWizardSteps.WelcomeScreen)
  ), [setCreatorStep]);

  const goToCreator = useCallback(() => (
    setCreatorStep(FormWizardSteps.MinterScreen)
  ), [setCreatorStep]);

  const goToSummary = useCallback(() => (
    setCreatorStep(FormWizardSteps.SummaryScreen)
  ), [setCreatorStep])

  const setCreatorStepToBackFromSummaryToCurrent = useCallback(() => {
    if (creatorStepToBackFromSummary !== 0) {
      setCreatorStep(creatorStepToBackFromSummary)
    }
  }, [creatorStepToBackFromSummary, setCreatorStep])

  useEffect(() => {
    if (creatorStep === FormWizardSteps.WelcomeScreen) {
      setCreatorStepToBackFromSummary(0)
    }
  }, [setCreatorStepToBackFromSummary, creatorStep])

  const renderFormWizard = useCallback((creatorStep: FormWizardSteps) => {
    switch (creatorStep) {
      case FormWizardSteps.WelcomeScreen:
        return <Welcome goToCreator={goToCreator} />

      case FormWizardSteps.MinterScreen:
        return (
          <MinterWizardStepWrapper
            steps={minterWizardSteps}
            backToMintTypeSelection={backToMintTypeSelection}
            goToSummary={goToSummary}
          />
        )

      case FormWizardSteps.SummaryScreen:
        return (
          <MinterWizardSummary
            goToCreator={goToCreator}
          />
        )
    }
  }, [minterWizardSteps, backToMintTypeSelection, goToCreator, goToSummary])

  return (
    <MinterWizardContext.Provider
      value={{
        creatorStepToBackFromSummary,
        setCreatorStepToBackFromSummary,
        setCreatorStepToBackFromSummaryToCurrent
      }}
    >
      <div className='wizard-form'>
        <Form className='form'>
          <div className='minter-wizard__container'>
            {renderFormWizard(creatorStep)}
          </div>
        </Form>
      </div>
    </MinterWizardContext.Provider>
  );
}
