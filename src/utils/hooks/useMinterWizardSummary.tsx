import React, { useCallback } from 'react'
import { useField } from 'formik'
import { MintTypes } from '@/utils/entity/MinterWizard';
import NewNftNewCollectionSideSummary from '@/components/shared/minter-wizard/summary/content/NewNFTNewCollection';
import ExistingCollectionNewNFTSideSummary from '@/components/shared/minter-wizard/summary/content/ExistingCollectionNewNFT';

const useMinterWizardSummary = (step : number) => {
  const [field] = useField('mint_type')

  const summaryContent = useCallback(() => {
    if (field.value) {
      switch (field.value) {
        case MintTypes.NewCollectionNewNFT:
          return <NewNftNewCollectionSideSummary step={step} />
        case MintTypes.ExistingCollectionNewNFT:
          return <ExistingCollectionNewNFTSideSummary step={step} />
      }
    }
    return null
  }, [field.value, step])

  return summaryContent()
}

export default useMinterWizardSummary
