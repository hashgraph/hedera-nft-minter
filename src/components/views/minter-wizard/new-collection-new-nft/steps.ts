import OnChain from '@components/views/minter-wizard/new-collection-new-nft/OnChain';
import OffChain from '@components/views/minter-wizard/new-collection-new-nft/OffChain';
import Advenced from '@components/views/minter-wizard/new-collection-new-nft/Advenced';

export enum NewCollectionNewNFTWizardSteps {
  OnChainScreen = 0,
  OffChainScreen = 1,
  AdvencedScreen = 2,
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
    creatorStep: NewCollectionNewNFTWizardSteps.AdvencedScreen,
    Component: Advenced
  },
]

export default Steps
