import {WizardSteps as IWizardSteps, MintTypes} from '@utils/entity/MinterWizard'
import
  NewCollectionNewNftSteps
from '@components/views/minter-wizard/steps/new-collection-new-nft';
import
  ExistingCollectionNewNftSteps
from '@components/views/minter-wizard/steps/existing-collection-new-nft';

const wizardSteps = {
  [MintTypes.NewCollectionNewNFT]: NewCollectionNewNftSteps,
  [MintTypes.ExistingCollectionNewNFT]: ExistingCollectionNewNftSteps,
} as IWizardSteps

export default wizardSteps
