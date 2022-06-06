import {MintTypes, WizardSteps as IWizardSteps} from '@utils/entity/MinterWizard'
import
  NewCollectionNewNftSteps
from '@components/views/minter-wizard/new-collection-new-nft/steps';
import
  ExistingCollectionNewNftSteps
from '@components/views/minter-wizard/existing-collection-new-nft/steps';
import
  ExistingCollectionExistingNftSteps
from '@components/views/minter-wizard/existing-collection-existing-nft/steps';

const wizardSteps = {
  [MintTypes.NewCollectionNewNFT]: NewCollectionNewNftSteps,
  [MintTypes.ExistingCollectionNewNFT]: ExistingCollectionNewNftSteps,
  [MintTypes.ExistingCollectionExistingNFT]: ExistingCollectionExistingNftSteps
} as IWizardSteps

export default wizardSteps
