import { WizardScreen } from '@/utils/hooks/useMinterWizard';
import
  NewCollectionNewNftSteps
from '@components/views/minter-wizard/new-collection-new-nft/steps';

export enum MintTypes {
  NewCollectionNewNFT = 'new_collection_new_NFT',
  ExistingCollectionNewNFT = 'existing_collection_new_NFT',
  ExistingCollectionExistingNFT = 'existing_collection_existing_NFT',
}

interface IWizardSteps {
  [MintTypes.NewCollectionNewNFT]: WizardScreen[],
  [MintTypes.ExistingCollectionNewNFT]: WizardScreen[],
  [MintTypes.ExistingCollectionExistingNFT]: WizardScreen[],
}

const wizardSteps = {
  'new_collection_new_NFT': NewCollectionNewNftSteps,
  'existing_collection_new_NFT': [],
  'existing_collection_existing_NFT':[]
} as IWizardSteps

export default wizardSteps
