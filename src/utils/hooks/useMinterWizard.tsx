import React, { useState, useMemo, useCallback } from 'react'
import { FormikValues, useFormikContext } from 'formik';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import { CreatorStep, CreatorSteps, MintTypes } from '@utils/entity/MinterWizard';
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

  const getStepFieldsNames = useCallback(() => {
    const allMandatoryFields = [] as string[];
    const allOptionalFields = [] as string[];
    if (mintType) {
      const currentStepsData = wizardSteps[mintType as MintTypes] as CreatorSteps;
      for (let i = 0; i <= creatorStep && i < currentStepsData.length; i++) {
        if (typeof currentStepsData[i as CreatorStep]?.mandatoryFields !== 'undefined') {
          for (const nameOfMandatoryField of currentStepsData[i as CreatorStep]?.mandatoryFields as string[]) {
            allMandatoryFields.push(nameOfMandatoryField)
          }
        }
        if (typeof currentStepsData[i as CreatorStep]?.optionalFields !== 'undefined') {
          for (const nameOfOptionalField of currentStepsData[i as CreatorStep]?.optionalFields as string[]) {
            allOptionalFields.push(nameOfOptionalField)
          }
        }
      }
    }
    return {allMandatoryFields, allOptionalFields};
  }, [creatorStep, mintType])

  const handleCreatorNextButton = useCallback((e) => {
    const checkIfMandatoryFieldsAreValidated = () => {
      const {allMandatoryFields} = getStepFieldsNames()

      for (const nameOfMandatoryFieldToValidate in allMandatoryFields) {
        if (typeof values[nameOfMandatoryFieldToValidate] !== 'undefined') {
          validateField(nameOfMandatoryFieldToValidate)
          allMandatoryFields.push(nameOfMandatoryFieldToValidate)
        }
      }

      const foundErrors = filter(Object.keys(errors),
        error => allMandatoryFields.includes(error)
      )

      for (const fieldName of foundErrors) {
        setFieldTouched(fieldName, true, true)
      }

      if (foundErrors.length === 0) {
        return true
      }

      return false
    }

    const checkIfOptionalFieldsAreValidated = () => {
      const { allOptionalFields } = getStepFieldsNames()

      for(const optionalFieldName of allOptionalFields){
        if(typeof errors[optionalFieldName] !== 'undefined'){
          if(isArray(errors[optionalFieldName])){
            for(const optionalArrayFieldValue in errors[optionalFieldName] as []){
              if(typeof errors[optionalFieldName][optionalArrayFieldValue] !== 'undefined'){
                return false
              }
            }
          }

          if(typeof errors[optionalFieldName] !== 'undefined'){
            return false
          }
        }
      }
      return true
    }

    e.preventDefault();
    const areMandatoryFieldsValidated = checkIfMandatoryFieldsAreValidated();
    const areOptionalFieldsValidated = checkIfOptionalFieldsAreValidated()

    if (!isLastScreen && areMandatoryFieldsValidated && areOptionalFieldsValidated) {
      setCreatorStep(prev => prev + 1)
    } else {
      toast.error('Fix creator errors!')
    }
  }, [
    setFieldTouched,
    setCreatorStep,
    isLastScreen,
    errors,
    validateField,
    getStepFieldsNames,
    values
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

