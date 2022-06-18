import OnChain from '@components/views/minter-wizard/new-collection-new-nft/OnChain';
import OffChainBasis from '@/components/views/minter-wizard/new-collection-new-nft/OffChainBasis';
import OffChainPropertiesAndAttributes from '@/components/views/minter-wizard/new-collection-new-nft/OffChainPropertiesAndAttributes';
import Advanced from '@components/views/minter-wizard/new-collection-new-nft/Advanced';

export enum NewCollectionNewNFTWizardSteps {
  OnChainScreen = 0,
  OffChainBasisScreen = 1,
  OffChainPropertiesAndAttributesScreen = 2,
  AdvancedScreen = 3,
}

const Steps = [
  {
    creatorStep: NewCollectionNewNFTWizardSteps.OnChainScreen,
    Component: OnChain,
    mandatoryFields: ['maxSupply', 'qty']
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.OffChainBasisScreen,
    Component: OffChainBasis,
    mandatoryFields: ['name', 'symbol']
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen,
    Component: OffChainPropertiesAndAttributes
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.AdvancedScreen,
    Component: Advanced
  },
]

export default Steps
