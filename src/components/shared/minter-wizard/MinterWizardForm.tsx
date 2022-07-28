import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, FormikProps, FormikState, FormikValues } from 'formik';

import { MintTypes } from '@utils/entity/MinterWizard'
import Welcome from '@/components/views/minter-wizard/Welcome';
import wizardSteps from '@components/views/minter-wizard/wizard-steps';
import MinterWizardStepWrapper from '@/components/shared/minter-wizard/StepWrapper';
import MinterWizardSummary from '@/components/shared/minter-wizard/summary';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { TokenInfo } from '@/utils/entity/TokenInfo';
import { initialValues, WizardValues } from '@/utils/const/minter-wizard';

export enum FormWizardSteps {
  WelcomeScreen = 0,
  MinterScreen = 1,
  SummaryScreen = 2,
}

export const MinterWizardContext = React.createContext<{
  setCreatorStepToBackFromSummary: React.Dispatch<React.SetStateAction<number>>,
  setCreatorStepToBackFromSummaryToCurrent: () => void,
  setCollections:  React.Dispatch<React.SetStateAction<{ nfts: NFTInfo[]; info: TokenInfo; }[] | null>>,
  creatorStepToBackFromSummary: number,
  collections: { nfts: NFTInfo[]; info: TokenInfo; }[] | null,
}>({
  creatorStepToBackFromSummary: 0,
  collections: [],
  setCreatorStepToBackFromSummary: () => false,
  setCreatorStepToBackFromSummaryToCurrent: () => false,
  setCollections: () => null,
})

export default function MinterWizardForm({
  values,
  resetForm
}: FormikProps<FormikValues>) {
  const [creatorStep, setCreatorStep] = useState(FormWizardSteps.WelcomeScreen);
  const [creatorStepToBackFromSummary, setCreatorStepToBackFromSummary] = useState(0)
  const [collections, setCollections] = useState<{ nfts: NFTInfo[]; info: TokenInfo; }[] | null>(null)

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
      resetForm({values: {...initialValues, mint_type: values.mint_type}} as Partial<FormikState<WizardValues>>)
      setCollections(null)
    }
  }, [creatorStepToBackFromSummary, creatorStep, resetForm, values.mint_type])

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
        setCreatorStepToBackFromSummaryToCurrent,
        collections,
        setCollections
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
