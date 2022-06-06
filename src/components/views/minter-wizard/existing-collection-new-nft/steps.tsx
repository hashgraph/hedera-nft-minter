import SelectCollection from '@/components/shared/minter-wizard/minter-wizard-select-collection';
import OnChain from '@components/views/minter-wizard/existing-collection-new-nft/OnChain';
import OffChain from '@components/views/minter-wizard/existing-collection-new-nft/OffChain';
import Advenced from '@components/views/minter-wizard/existing-collection-new-nft/Advenced';

export enum ExistingCollectionNewNFTWizardSteps {
  SelectCollectionScreen = 0,
  OnChainScreen = 1,
  OffChainScreen = 2,
  AdvencedScreen = 3,
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
    step: ExistingCollectionNewNFTWizardSteps.AdvencedScreen,
    Component: Advenced
  },
]

export default Steps
