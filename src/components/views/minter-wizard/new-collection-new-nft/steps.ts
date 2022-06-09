import OnChain from '@components/views/minter-wizard/new-collection-new-nft/OnChain';
import OffChain from '@components/views/minter-wizard/new-collection-new-nft/OffChain';
import Advanced from '@components/views/minter-wizard/new-collection-new-nft/Advanced';

export enum NewCollectionNewNFTWizardSteps {
  OnChainScreen = 0,
  OffChainScreen = 1,
  AdvancedScreen = 2,
}

const Steps = [
  {
    creatorStep: NewCollectionNewNFTWizardSteps.OnChainScreen,
    Component: OnChain
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.OffChainScreen,
    Component: OffChain
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.AdvancedScreen,
    Component: Advanced
  },
]

export default Steps
