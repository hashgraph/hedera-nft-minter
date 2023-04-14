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

import React, { useCallback, useMemo, useState } from 'react'
import { JSX } from '@babel/types'
import { FormikValues } from 'formik'
import isEmpty from 'lodash/isEmpty'

export enum FormWizardSteps {
  WelcomeScreen = 0,
  MinterScreen = 1,
  SummaryScreen = 2,
}

interface HomepageContextProps {
  mintedNFTData: FormikValues
  setNewNFTdata: React.Dispatch<React.SetStateAction<FormikValues>>
  tokenCreated: boolean
  resetHomepageData: () => void
  isMinterWizardWelcomeScreen: boolean
  creatorStep: FormWizardSteps
  setCreatorStep: React.Dispatch<React.SetStateAction<FormWizardSteps>>
}

export const HomepageContext = React.createContext<HomepageContextProps>({
  mintedNFTData: {},
  setNewNFTdata: () => null,
  tokenCreated: false,
  resetHomepageData: () => null,
  isMinterWizardWelcomeScreen: false,
  creatorStep: FormWizardSteps.WelcomeScreen,
  setCreatorStep: () => null,
})

export const HomepageContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [creatorStep, setCreatorStep] = useState(FormWizardSteps.WelcomeScreen);
  const [mintedNFTData, setNewNFTdata] = useState<FormikValues>({});
  
  const resetHomepageData = useCallback(() => {
    setCreatorStep(FormWizardSteps.WelcomeScreen)
    setNewNFTdata({})
  }, [])

  const isMinterWizardWelcomeScreen = useMemo(() => (
    creatorStep === FormWizardSteps.WelcomeScreen
  ), [creatorStep])

  const tokenCreated = useMemo(() => (
    !isEmpty(mintedNFTData)
  ), [mintedNFTData])

  return (
    <HomepageContext.Provider
      value={{
        mintedNFTData,
        setNewNFTdata,
        tokenCreated,
        isMinterWizardWelcomeScreen,
        creatorStep,
        setCreatorStep,
        resetHomepageData
      }}
    >
      {children}
    </HomepageContext.Provider>
  )
}