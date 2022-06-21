import { FormikErrors, FormikValues } from 'formik';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import { CreatorSteps, MintTypes } from '@utils/entity/MinterWizard';
import wizardSteps from '@/components/views/minter-wizard/wizard-steps';
import { WizardValues } from '@/utils/const/minter-wizard';

export const getCurrentStepFieldsNames = (
  mintType: MintTypes,
  creatorStep: number,
) => {
  const allMandatoryFields: string[] = [];
  const allOptionalFields: string[] = [];
  if (mintType) {
    const currentStepsData: CreatorSteps = wizardSteps[mintType];
    for (let i = 0; i <= creatorStep && i < currentStepsData.length; i++) {
      const mandatoryFields = currentStepsData[i]?.mandatoryFields;
      const optionalFields = currentStepsData[i]?.optionalFields

      if (typeof mandatoryFields !== 'undefined') {
        for (const nameOfMandatoryField of mandatoryFields) {
          allMandatoryFields.push(nameOfMandatoryField)
        }
      }
      if (typeof optionalFields !== 'undefined') {
        for (const nameOfOptionalField of optionalFields) {
          allOptionalFields.push(nameOfOptionalField)
        }
      }
    }
  }
  return { allMandatoryFields, allOptionalFields };
}

export const checkIfMandatoryFieldsAreValidated = (
  allMandatoryFields: string[],
  validateField: (field: string) => void,
  setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void,
  values: FormikValues,
  errors: FormikErrors<FormikValues>
) => {
  // First validate mandatory fields
  for (const nameOfMandatoryFieldToValidate in allMandatoryFields) {
    if (typeof values[nameOfMandatoryFieldToValidate] !== 'undefined') {
      validateField(nameOfMandatoryFieldToValidate)
    }
  }

  //Next set untouched mandatory fields to touched to display errors underneath
  const foundErrors = filter(Object.keys(errors),
    errorFieldName => {
      if (allMandatoryFields.includes(errorFieldName)) {
        setFieldTouched(errorFieldName, true, true)
        return true
      }
      return false
    })

  if (foundErrors.length === 0) {
    return true
  }

  return false
}

export const checkIfOptionalFieldsAreValidated = (allOptionalFields: string[], errors: FormikErrors<WizardValues>) => {
  for (const optionalFieldName of allOptionalFields) {
    if (typeof errors[optionalFieldName] !== 'undefined') {
      switch (isArray(errors[optionalFieldName])) {
        case true:
          for (const optionalArrayFieldValue in errors[optionalFieldName]) {
            if (typeof errors[optionalFieldName][optionalArrayFieldValue] !== 'undefined') {
              return false
            }
          }
          break;

        default:
          return false
      }
    }
  }
  return true
}

