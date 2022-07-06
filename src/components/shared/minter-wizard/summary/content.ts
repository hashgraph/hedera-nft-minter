import { MintTypes } from '@/utils/entity/MinterWizard';
import
  { NewCollectionNewNFTWizardSteps }
from '@components/views/minter-wizard/new-collection-new-nft/steps';
import
  ExistingCollectionNewNftSteps
from '@components/views/minter-wizard/existing-collection-new-nft/steps';
import
  ExistingCollectionExistingNftSteps
from '@components/views/minter-wizard/existing-collection-existing-nft/steps';


const Screens = {
    [MintTypes.NewCollectionNewNFT]: NewCollectionNewNFTWizardSteps,
    [MintTypes.ExistingCollectionNewNFT]: ExistingCollectionNewNftSteps,
    [MintTypes.ExistingCollectionExistingNFT]: ExistingCollectionExistingNftSteps,
}

export default Screens


