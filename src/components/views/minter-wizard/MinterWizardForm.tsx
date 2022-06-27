import React, { useCallback, useMemo, useState } from 'react';
import { Form, FormikProps, FormikValues } from 'formik';

import { MintTypes } from '@utils/entity/MinterWizard'
import Welcome from '@/components/views/minter-wizard/Welcome';
import wizardSteps from '@components/views/minter-wizard/wizard-steps';
import MinterWizardStepWrapper from '@/components/shared/minter-wizard/StepWrapper';

export enum FormWizardSteps {
  WelcomeScreen = 0,
  MinterScreen = 1,
}

export default function MinterWizardForm({
  values,
}: FormikProps<FormikValues>) {
  const [step, setStep] = useState(FormWizardSteps.WelcomeScreen);

  const minterWizardSteps = useMemo(() => (
    wizardSteps[values.mint_type as MintTypes]
  ), [values.mint_type])

  const backToMintTypeSelection = useCallback(() =>(
    setStep(FormWizardSteps.WelcomeScreen)
  ), [setStep]);

  const goToCreator = useCallback(() =>(
    setStep(FormWizardSteps.MinterScreen)
  ), [setStep]);

  const renderFormWizard = useCallback((step: FormWizardSteps) => {
    switch (step) {
      case FormWizardSteps.WelcomeScreen:
        return <Welcome goToCreator={goToCreator}/>

      case FormWizardSteps.MinterScreen:
        return (
          <MinterWizardStepWrapper
            steps={minterWizardSteps}
            backToMintTypeSelection={backToMintTypeSelection}
          />
        )
    }
  }, [minterWizardSteps, backToMintTypeSelection, goToCreator])

  return (
    <div className='wizard-form'>
      <Form className='form'>
        <div className='minter-wizard__container'>
          {renderFormWizard(step)}
        </div>
      </Form>
    </div>
  );
}
