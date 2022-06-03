import {WizardSteps as IWizardSteps} from '@utils/entity/MinterWizard'
import
  NewCollectionNewNftSteps
from '@components/views/minter-wizard/new-collection-new-nft/steps';

const wizardSteps = {
  'new_collection_new_NFT': NewCollectionNewNftSteps,
  'existing_collection_new_NFT': [],
  'existing_collection_existing_NFT':[]
} as IWizardSteps

export default wizardSteps
