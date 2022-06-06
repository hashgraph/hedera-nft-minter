import SelectCollection from '@/components/shared/minter-wizard/minter-wizard-select-collection';
import SelectEdition from '@components/views/minter-wizard/existing-collection-existing-nft/SelectEdition';

export enum ExistingCollectionExistingNFTWizardSteps {
  SelectCollectionScreen = 0,
  SelectEditionScreen = 1,
}

const Steps = [
  {
    step: ExistingCollectionExistingNFTWizardSteps.SelectCollectionScreen,
    Component: SelectCollection
  },
  {
    step: ExistingCollectionExistingNFTWizardSteps.SelectEditionScreen,
    Component: SelectEdition
  },
]

export default Steps
