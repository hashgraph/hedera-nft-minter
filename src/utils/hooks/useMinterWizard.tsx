import React, { useState, useMemo, useCallback } from 'react'
import { FormikValues, useFormikContext } from 'formik';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';
import {  CreatorStep, CreatorSteps, MintTypes } from '@utils/entity/MinterWizard';
import wizardSteps from '@/components/views/minter-wizard/wizard-steps';

export default function useMinterWizard(
  steps: CreatorSteps
) {
  const [creatorStep, setCreatorStep] = useState(0);
  const { setFieldTouched, validateField, errors, values } = useFormikContext<FormikValues>()
  const mintType = useMemo(() => values.mint_type, [values.mint_type])

  const isFirstScreen = useMemo(() => (
    steps && creatorStep === steps[0]?.creatorStep
  ), [creatorStep, steps])

  const isLastScreen = useMemo(() => (
    steps && creatorStep === steps[steps?.length - 1]?.creatorStep
  ), [creatorStep, steps])

  const handleCreatorNextButton = useCallback((e) => {
    const validateMandatoryFields = () => {
      const allMandatoryFields = [] as string[]
      if (mintType) {
        const currentStepsData = wizardSteps[mintType as MintTypes] as CreatorSteps;
        for (let i = 0; i <= creatorStep && i < currentStepsData.length; i++) {
          if (typeof currentStepsData[i as CreatorStep]?.mandatoryFields !== 'undefined') {
            for (const nameOfFieldToValidate of currentStepsData[i as CreatorStep]?.mandatoryFields as string[]) {
              validateField(nameOfFieldToValidate)
              allMandatoryFields.push(nameOfFieldToValidate)
            }
          }
        }

        const foundErrors = filter(Object.keys(errors), e => allMandatoryFields.includes(e))

        for (const fieldName of foundErrors) {
          setFieldTouched(fieldName, true, true)
        }
        if (foundErrors.length === 0) {
          return true
        }
      }

      toast.error('Fix errors before go further!')
      return false
    }

    e.preventDefault();
    const isValidated = validateMandatoryFields();

    if (!isLastScreen && isValidated) {
      setCreatorStep(prev => prev + 1)
    }
  }, [setFieldTouched, creatorStep, setCreatorStep, isLastScreen, mintType, errors, validateField])

  const handleCreatorPrevButton = useCallback(() => (
    !isFirstScreen && setCreatorStep(prev => prev - 1)
  ), [setCreatorStep, isFirstScreen])

  const renderMinterWizardScreen = useCallback((creatorStep: number) => {
    const Component = steps[creatorStep]?.Component;
    if (Component !== undefined) {
      return <Component />;
    }

    return null
  }, [steps])


  return {
    creatorStep,
    setCreatorStep,
    isFirstScreen,
    isLastScreen,
    handleCreatorNextButton,
    handleCreatorPrevButton,
    renderMinterWizardScreen,
    mintType
  }
}

