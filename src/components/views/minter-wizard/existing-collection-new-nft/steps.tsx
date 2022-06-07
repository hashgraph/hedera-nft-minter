import SelectCollection from '@/components/shared/minter-wizard/minter-wizard-select-collection';
import OnChain from '@components/views/minter-wizard/existing-collection-new-nft/OnChain';
import OffChain from '@components/views/minter-wizard/existing-collection-new-nft/OffChain';
import Advanced from '@components/views/minter-wizard/existing-collection-new-nft/Advanced';

export enum ExistingCollectionNewNFTWizardSteps {
  SelectCollectionScreen = 0,
  OnChainScreen = 1,
  OffChainScreen = 2,
  AdvancedScreen = 3,
}

const Steps = [
  {
    step: ExistingCollectionNewNFTWizardSteps.SelectCollectionScreen,
    Component: SelectCollection
  },
  {
    step: ExistingCollectionNewNFTWizardSteps.OnChainScreen,
    Component: OnChain
  },
  {
    step: ExistingCollectionNewNFTWizardSteps.OffChainScreen,
    Component: OffChain
  },
  {
    step: ExistingCollectionNewNFTWizardSteps.AdvancedScreen,
    Component: Advanced
  },
]

export default Steps
