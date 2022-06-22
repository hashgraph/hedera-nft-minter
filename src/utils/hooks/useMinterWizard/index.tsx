import React, { useState, useMemo, useCallback } from 'react'
import { FormikValues, useFormikContext } from 'formik';
import { toast } from 'react-toastify';
import { CreatorSteps, MintTypes } from '@utils/entity/MinterWizard';
import {
  getCurrentStepFieldsNames,
  checkIfMandatoryFieldsAreValidated,
  checkIfOptionalFieldsAreValidated
} from './helpers'

export default function useMinterWizard(
  steps: CreatorSteps
) {
  const [creatorStep, setCreatorStep] = useState(0);
  const { setFieldTouched, validateField, errors, values } = useFormikContext<FormikValues>()
  const mintType = useMemo<MintTypes>(() => values.mint_type, [values.mint_type])

  const isFirstScreen = useMemo(() => (
    steps && creatorStep === steps[0]?.creatorStep
  ), [creatorStep, steps])

  const isLastScreen = useMemo(() => (
    steps && creatorStep === steps[steps?.length - 1]?.creatorStep
  ), [creatorStep, steps])


  const handleCreatorNextButton = useCallback((e) => {
    e.preventDefault();

    const { allOptionalFields, allMandatoryFields } = getCurrentStepFieldsNames(mintType, creatorStep)

    const areMandatoryFieldsValidated = checkIfMandatoryFieldsAreValidated(
      allMandatoryFields,
      validateField,
      setFieldTouched,
      values,
      errors
    );
    const areOptionalFieldsValidated = checkIfOptionalFieldsAreValidated(allOptionalFields, errors)

    if (!isLastScreen && areMandatoryFieldsValidated && areOptionalFieldsValidated) {
      setCreatorStep(prev => prev + 1)
    } else {
      toast.error('Fix creator errors!')
    }
  }, [
    setCreatorStep,
    isLastScreen,
    errors,
    values,
    validateField,
    setFieldTouched,
    mintType,
    creatorStep,
  ])

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

