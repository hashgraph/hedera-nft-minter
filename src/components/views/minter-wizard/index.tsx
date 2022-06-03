import React, { useCallback, useMemo, useState } from 'react';
import { Form, FormikProps, FormikValues } from 'formik';

import Welcome from '@components/views/minter-wizard/welcome';
import wizardSteps, { MintTypes } from './wizard-steps';
import MinterWizardStepWrapper from '@/components/shared/minter-wizard/minter-wizard-step-wrapper';


export enum FormWizardSteps {
  WelcomeScreen = 0,
  MinterScreen = 1,
}

export default function MinterWizard({
  values,
}: FormikProps<FormikValues>) {
  const [step, setStep] = useState(FormWizardSteps.WelcomeScreen);

  const minterWizardSteps = useMemo(() =>
    wizardSteps[values.mint_type as MintTypes],
  [values.mint_type])

  const renderFormWizard = useCallback((step: FormWizardSteps) => {
    switch (step) {
      case FormWizardSteps.WelcomeScreen:
        return <Welcome />

      case FormWizardSteps.MinterScreen:
        return <MinterWizardStepWrapper steps={minterWizardSteps} />
    }
  }, [minterWizardSteps])

  return (
    <Form className='form'>
      {renderFormWizard(step)}

      {step === FormWizardSteps.WelcomeScreen
        ? (
          <button
            disabled={!values.mint_type}
            type='button'
            onClick={() => setStep(prev => prev + 1)}
          >
            Next
          </button>
        ) : (
          <button type='button' onClick={() => setStep(prev => prev - 1)}>
            Back to last step
          </button>
        )}
    </Form>
  );
}
