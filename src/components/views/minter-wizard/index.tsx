import React, { useCallback, useState } from 'react';
import { Form, FormikProps, FormikValues } from 'formik';

import Welcome from '@components/views/minter-wizard/welcome';
import NewCollectionNewNFT from '@components/views/minter-wizard/new-collection-new-nft'

export enum MintTypes {
  NewCollectionNewNFT = 'new_collection_new_NFT',
  ExistingCollectionNewNFT = 'existing_collection_new_NFT',
  ExistingCollectionExistingNFT = 'existing_collection_existing_NFT',
}

export enum FormWizardSteps {
  WelcomeScreen = 0,
  MinterScreen = 1,
}

export default function MinterWizard({
  values,
}: FormikProps<FormikValues>) {
  const [step, setStep] = useState(FormWizardSteps.WelcomeScreen);

  const renderMinterWizard = useCallback((step: MintTypes) => {
    switch (step) {
      case MintTypes.NewCollectionNewNFT:
        return <NewCollectionNewNFT />

      case MintTypes.ExistingCollectionNewNFT:
        return <p>ExistingCollectionNewNFT</p>

      case MintTypes.ExistingCollectionExistingNFT:
        return <p>ExistingCollectionExistingNFT</p>
    }
  }, [])

  const renderFormWizard = useCallback((step: FormWizardSteps) => {
    switch (step) {
      case FormWizardSteps.WelcomeScreen:
        return <Welcome />

      case FormWizardSteps.MinterScreen:
        return renderMinterWizard(values.mint_type)
    }
  }, [renderMinterWizard, values.mint_type])

  return (
    <Form className='form'>
      {renderFormWizard(step)}

      {step === FormWizardSteps.WelcomeScreen
        ? (
          <button
            disabled={!values.mint_type}
            type='button'
            onClick={() => setStep(prev => prev + 1)}
          >
            Next
          </button>
        ) : (
          <button type='button' onClick={() => setStep(prev => prev - 1)}>
            Back to last step
          </button>
        )}
    </Form>
  );
}
