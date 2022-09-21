import { FormikErrors, FormikValues } from 'formik';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import each from 'lodash/each';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import map from 'lodash/map';
import flatMap from 'lodash/flatMap';
import { CreatorSteps, MintTypes } from '@utils/entity/MinterWizard';
import wizardSteps from '@/components/views/minter-wizard/steps';


export const getCurrentStepFieldsNames = (
  mintType: MintTypes,
  creatorStep: number,
) => {
  let allFieldsForValidation: string[] = [];

  if (Object.values(MintTypes).includes(mintType)) {
    const currentStepsData: CreatorSteps = wizardSteps[mintType];

    for (let i = 0; (i <= creatorStep) && (i < currentStepsData.length); i++) {
      const fieldsForValidation = currentStepsData[i]?.fieldsForValidation;

      if (fieldsForValidation) {
        allFieldsForValidation = [...allFieldsForValidation, ...fieldsForValidation]
      }
    }
  }

  return allFieldsForValidation;
}

const findAllErrorsNames = (errors: string[] | FormikErrors<FormikValues>[] | FormikErrors<FormikValues>, parentName?: string) => {
  const errorNames = filter(flatMap(Object.entries(errors), ([errorKey, errorValue]) => {
    const fieldName = parentName ? (
      `${ parentName }.${ errorKey }`
    ) : (
      errorKey
    )

    if (errorValue && isArray(errorValue)) {
      return findAllErrorsNames(errorValue, fieldName)
    }

    if (errorValue && isPlainObject(errorValue)) {
      return map(Object.keys(errorValue), (errorKey) => (
        `${ fieldName ? `${ fieldName }.` : '' }${ errorKey }`
      ))
    }

    if (errorValue && isString(errorValue)) {
      return errorKey
    }

    return false
  }), Boolean) as string[]

  return errorNames
}

export const checkIfFieldsAreValidated = (
  fieldsForValidation: string[],
  validateField: (field: string) => void,
  setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void,
  values: FormikValues,
  errors: FormikErrors<FormikValues>
) => {
  // First validate fields
  each(fieldsForValidation, (el) => !!values[el] && validateField(el))

  // Get all existing error names
  const allErrorNames = findAllErrorsNames(errors);

  //Next set untouched fields to touched to display errors underneath
  const foundErrors = filter(allErrorNames, errorFieldName => {
      //If field is array, get head field name to check if its needs validation
      const fieldName = errorFieldName.split('.')[0];

      if (fieldsForValidation.includes(fieldName)) {
        setFieldTouched(errorFieldName, true, true)
        return true
      }

      return false
  })

  return foundErrors.length === 0
}

