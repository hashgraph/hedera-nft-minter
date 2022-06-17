import SelectCollection from '@/components/shared/minter-wizard/minter-wizard-select-collection';
import OffChainBasis from '@/components/views/minter-wizard/existing-collection-new-nft/OffChainBasis';
import OffChainPropertiesAndAttributes
 from '@/components/views/minter-wizard/existing-collection-new-nft/OffChainPropertiesAndAttributes';

export enum ExistingCollectionNewNFTWizardSteps {
  SelectCollectionScreen = 0,
  OffChainScreen = 1,
  OffChainPropertiesAndAttributesScreen = 2,
}

const Steps = [
  {
    creatorStep: ExistingCollectionNewNFTWizardSteps.SelectCollectionScreen,
    Component: SelectCollection
  },
  {
    creatorStep: ExistingCollectionNewNFTWizardSteps.OffChainScreen,
    Component: OffChainBasis
  },
  {
    creatorStep: ExistingCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen,
    Component: OffChainPropertiesAndAttributes
  },
]

export default Steps
