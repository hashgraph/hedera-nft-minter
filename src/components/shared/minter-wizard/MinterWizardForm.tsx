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
  setLastCreatorStep: React.Dispatch<React.SetStateAction<number>>,
  lastCreatorStep: number
}>({
  lastCreatorStep: 0,
  setLastCreatorStep: () => false
})

export default function MinterWizardForm({
  values,
}: FormikProps<FormikValues>) {
  const [step, setStep] = useState(FormWizardSteps.WelcomeScreen);
  const [lastCreatorStep, setLastCreatorStep] = useState(0)

  const minterWizardSteps = useMemo(() => (
    wizardSteps[values.mint_type as MintTypes]
  ), [values.mint_type])

  const backToMintTypeSelection = useCallback(() => (
    setStep(FormWizardSteps.WelcomeScreen)
  ), [setStep]);

  const goToCreator = useCallback(() => (
    setStep(FormWizardSteps.MinterScreen)
  ), [setStep]);

  const goToSummary = useCallback(() => (
    setStep(FormWizardSteps.SummaryScreen)
  ), [setStep])

  useEffect(() => {
    if(step === FormWizardSteps.WelcomeScreen) {
      setLastCreatorStep(0)
    }
  }, [setLastCreatorStep, step])

  const renderFormWizard = useCallback((step: FormWizardSteps) => {
    switch (step) {
      case FormWizardSteps.WelcomeScreen:
        return <Welcome goToCreator={goToCreator}/>

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
    <MinterWizardContext.Provider value={{lastCreatorStep, setLastCreatorStep}}>
      <div className='wizard-form'>
        <Form className='form'>
          <div className='minter-wizard__container'>
            {renderFormWizard(step)}
          </div>
        </Form>
      </div>
    </MinterWizardContext.Provider>
  );
}
