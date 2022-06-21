import { FormikErrors, FormikValues } from 'formik';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import every from 'lodash/every';
import each from 'lodash/each';
import { CreatorSteps, MintTypes } from '@utils/entity/MinterWizard';
import wizardSteps from '@/components/views/minter-wizard/wizard-steps';


export const getCurrentStepFieldsNames = (
  mintType: MintTypes,
  creatorStep: number,
) => {
  let allMandatoryFields: string[] = [];
  let allOptionalFields: string[] = [];

  if (Object.values(MintTypes).includes(mintType)) {
    const currentStepsData: CreatorSteps = wizardSteps[mintType];

    for (let i = 0; (i <= creatorStep) && (i < currentStepsData.length); i++) {
      const mandatoryFields = currentStepsData[i]?.mandatoryFields;
      const optionalFields = currentStepsData[i]?.optionalFields

      if (mandatoryFields) {
        allMandatoryFields = [...allMandatoryFields, ...mandatoryFields]
      }
      if (optionalFields) {
        allOptionalFields = [...allOptionalFields, ...optionalFields]
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
  // // First validate mandatory fields
  each(allMandatoryFields, (el) => !!values[el] && validateField(el))

  //Next set untouched mandatory fields to touched to display errors underneath
  const foundErrors = filter(Object.keys(errors),
    errorFieldName => {
      if (allMandatoryFields.includes(errorFieldName)) {
        setFieldTouched(errorFieldName, true, true)
        return true
      }
      return false
  })

  return foundErrors.length === 0
}

export const checkIfOptionalFieldsAreValidated = (allOptionalFields: string[], errors: FormikErrors<FormikValues>) => {
  const foundErrors = filter(allOptionalFields, (optionalFieldName) =>
    isArray(errors[optionalFieldName])
      ? every(errors[optionalFieldName] as [], (el) => !!el)
      : !!errors[optionalFieldName]
  )
  return foundErrors.length === 0
}

