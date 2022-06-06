import { WizardScreen } from '../hooks/useMinterWizard';

export enum MintTypes {
  NewCollectionNewNFT = 'new_collection_new_NFT',
  ExistingCollectionNewNFT = 'existing_collection_new_NFT',
  ExistingCollectionExistingNFT = 'existing_collection_existing_NFT',
}

export interface WizardSteps {
  [MintTypes.NewCollectionNewNFT]: WizardScreen[],
  [MintTypes.ExistingCollectionNewNFT]: WizardScreen[],
  [MintTypes.ExistingCollectionExistingNFT]: WizardScreen[],
}
