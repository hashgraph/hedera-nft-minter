/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { useState, useMemo, useCallback } from 'react'
import { FormikValues, useFormikContext } from 'formik';
import { toast } from 'react-toastify';
import { CreatorSteps, MintTypes } from '@utils/entity/MinterWizard';
import MINTER_WIZARD_ERROR_MESSAGES from '@utils/const/minter-wizard-error-messages';
import useHederaWallets from '@utils/hooks/useHederaWallets';
import {
  getCurrentStepFieldsNames,
  checkIfFieldsAreValidated,
  checkIfFieldsRequireConnectedWallet
} from './helpers'

export default function useMinterWizard(
  steps: CreatorSteps
) {
  const [creatorStep, setCreatorStep] = useState(0);
  const { userWalletId } = useHederaWallets()
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

  const checkIfAllFieldsAreValidated = useCallback(() => {
    const allFieldsForValidation = getCurrentStepFieldsNames(mintType, creatorStep)

    return checkIfFieldsAreValidated(
      allFieldsForValidation,
      validateField,
      setFieldTouched,
      values,
      errors
    );
  }, [creatorStep, errors, mintType, setFieldTouched, validateField, values])


  const handleCreatorNextButton = useCallback((e) => {
    e.preventDefault();

    const areFieldsRequireConnectedWallet = checkIfFieldsRequireConnectedWallet(mintType, creatorStep)
    const areFieldsValidated = checkIfAllFieldsAreValidated()

    if (!aboveLastScreen && areFieldsValidated) {
      const nextStep = creatorStep >= steps?.length - 1
        ? creatorStep
        : creatorStep + 1

      setCreatorStep(nextStep)
    } else {
      if (areFieldsRequireConnectedWallet && !userWalletId) {
        toast.error(MINTER_WIZARD_ERROR_MESSAGES.CONNECT_WALLET)
      } else {
        toast.error(MINTER_WIZARD_ERROR_MESSAGES.FIX_ERRORS)
      }
    }
  }, [mintType, creatorStep, checkIfAllFieldsAreValidated, aboveLastScreen, steps?.length, userWalletId])

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
    mintType,
    checkIfAllFieldsAreValidated
  }
}

