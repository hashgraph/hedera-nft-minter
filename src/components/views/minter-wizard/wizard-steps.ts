import {WizardSteps as IWizardSteps, MintTypes} from '@utils/entity/MinterWizard'
import
  NewCollectionNewNftSteps
from '@components/views/minter-wizard/new-collection-new-nft/steps';

const wizardSteps = {
  [MintTypes.NewCollectionNewNFT]: NewCollectionNewNftSteps,
  [MintTypes.ExistingCollectionNewNFT]: [],
  [MintTypes.ExistingCollectionExistingNFT]: []
} as IWizardSteps

export default wizardSteps
