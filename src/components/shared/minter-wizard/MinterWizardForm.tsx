import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, FormikProps, FormikState, FormikValues } from 'formik';
import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';

import useLayout from '@/utils/hooks/useLayout';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { TokenInfo } from '@/utils/entity/TokenInfo';
import { initialValues, WizardValues } from '@/utils/const/minter-wizard';
import { MintTypes } from '@utils/entity/MinterWizard'
import Welcome from '@/components/views/minter-wizard/Welcome';
import wizardSteps from '@components/views/minter-wizard/wizard-steps';
import MinterWizardStepWrapper from '@/components/shared/minter-wizard/StepWrapper';
import MinterWizardSummary from '@/components/shared/minter-wizard/summary';
import FloatingCollections from '@/components/shared/FloatingCollections'

export enum FormWizardSteps {
  WelcomeScreen = 0,
  MinterScreen = 1,
  SummaryScreen = 2,
}

export const MinterWizardContext = React.createContext<{
  setCreatorStepToBackFromSummary: React.Dispatch<React.SetStateAction<number>>,
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>,
  setCreatorStepToBackFromSummaryToCurrent: () => void,
  setCollections:  React.Dispatch<React.SetStateAction<{ nfts: NFTInfo[]; info: TokenInfo; }[] | null>>,
  creatorStepToBackFromSummary: number,
  collections: { nfts: NFTInfo[]; info: TokenInfo; }[] | null,
  creatorStep: FormWizardSteps,
  showWarning: boolean,
}>({
  creatorStepToBackFromSummary: 0,
  showWarning: false,
  collections: [],
  setCreatorStepToBackFromSummary: () => false,
  setCreatorStepToBackFromSummaryToCurrent: () => false,
  setShowWarning: () => false,
  setCollections: () => null,
  creatorStep: FormWizardSteps.WelcomeScreen,
})

export default function MinterWizardForm({
  values,
  resetForm
}: FormikProps<FormikValues>) {
  const [creatorStep, setCreatorStep] = useState(FormWizardSteps.WelcomeScreen);
  const [creatorStepToBackFromSummary, setCreatorStepToBackFromSummary] = useState(0)
  const [collections, setCollections] = useState<{ nfts: NFTInfo[]; info: TokenInfo; }[] | null>(null)
  const [showWarning, setShowWarning] = useState(false)

  const { setIsMinterWizardWelcomeScreen } = useLayout()

  const minterWizardSteps = useMemo(() => (
    wizardSteps[values.mint_type as MintTypes]
  ), [values.mint_type])

  const isFloatingCollectionsVisible = useMemo(() => (
    creatorStep === FormWizardSteps.WelcomeScreen
  ), [creatorStep])

  const backToMintTypeSelection = useCallback(() => (
    setCreatorStep(FormWizardSteps.WelcomeScreen)
  ), [setCreatorStep]);

  const goToCreator = useCallback(() => {
    setCreatorStep(FormWizardSteps.MinterScreen)
  }, []);

  const goToSummary = useCallback(() => {
    setCreatorStep(FormWizardSteps.SummaryScreen)
  }, [])

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

  useEffect(() => {
    setIsMinterWizardWelcomeScreen(creatorStep === FormWizardSteps.WelcomeScreen)
  }, [creatorStep, setIsMinterWizardWelcomeScreen])


  const renderFormWizard = useCallback((creatorStep: FormWizardSteps) => {
    switch (creatorStep) {
      case FormWizardSteps.WelcomeScreen:
        return <Welcome goToCreator={goToCreator} isActive={creatorStep === FormWizardSteps.WelcomeScreen}/>

      case FormWizardSteps.MinterScreen:
        return (
          <MinterWizardStepWrapper
            steps={minterWizardSteps}
            backToMintTypeSelection={backToMintTypeSelection}
            goToSummary={goToSummary}
            isActive={creatorStep === FormWizardSteps.MinterScreen}
          />
        )

      case FormWizardSteps.SummaryScreen:
        return (
          <MinterWizardSummary
            goToCreator={goToCreator}
            lastStep={minterWizardSteps.length - 1}
            isActive={creatorStep === FormWizardSteps.SummaryScreen}
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
        setCollections,
        creatorStep,
        showWarning,
        setShowWarning
      }}
    >
      <div className='wizard-form'>
        <Form className='form'>
          <div className='minter-wizard__container'>
            <SwitchTransition mode={'out-in'}>
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
          </div>
        </Form>
      </div>

      <FloatingCollections isVisible={isFloatingCollectionsVisible}/>
    </MinterWizardContext.Provider>
  );
}
