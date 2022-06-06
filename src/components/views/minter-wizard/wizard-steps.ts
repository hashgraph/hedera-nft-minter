import {WizardSteps as IWizardSteps} from '@utils/entity/MinterWizard'
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
  'new_collection_new_NFT': NewCollectionNewNftSteps,
  'existing_collection_new_NFT': ExistingCollectionNewNftSteps,
  'existing_collection_existing_NFT': ExistingCollectionExistingNftSteps
} as IWizardSteps

export default wizardSteps
