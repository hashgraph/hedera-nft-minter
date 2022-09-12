import { useState, useMemo, useCallback } from 'react'
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

  const aboveLastScreen = useMemo(() => (
    steps && creatorStep > steps[steps?.length - 1]?.creatorStep
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

    if (!aboveLastScreen && areMandatoryFieldsValidated && areOptionalFieldsValidated && creatorStep + 1 < steps?.length) {
      setCreatorStep(prev => prev + 1)
    } else {
      toast.error('Fix creator errors!')
    }
  }, [
    aboveLastScreen,
    setCreatorStep,
    errors,
    values,
    validateField,
    setFieldTouched,
    mintType,
    creatorStep,
    steps
  ])

  const handleCreatorPrevButton = useCallback(() => (
    !isFirstScreen && setCreatorStep(prev => prev - 1)
  ), [setCreatorStep, isFirstScreen])

  return {
    creatorStep,
    setCreatorStep,
    isFirstScreen,
    isLastScreen,
    handleCreatorNextButton,
    handleCreatorPrevButton,
    mintType
  }
}

