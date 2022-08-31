import OnChain from '@components/views/minter-wizard/new-collection-new-nft/OnChain';
import OffChainBasis from '@components/shared/minter-wizard/OffChainBasis'
import OffChainPropertiesAndAttributes from '@components/shared/minter-wizard/OffChainPropertiesAndAttributes'
import AdvancedKeys from '@/components/views/minter-wizard/new-collection-new-nft/AdvancedKeys';
import AdvancedFees from '@/components/views/minter-wizard/new-collection-new-nft/AdvancedFees';

export enum NewCollectionNewNFTWizardSteps {
  OnChainScreen = 0,
  OffChainBasisScreen = 1,
  OffChainPropertiesAndAttributesScreen = 2,
  AdvancedFeesScreen = 3,
  AdvancedKeysScreen = 4,
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
    mandatoryFields: ['name', 'symbol'],
    optionalFields: ['edition_name', 'description', 'creator']
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen,
    Component: OffChainPropertiesAndAttributes,
    optionalFields: ['properties', 'attributes']
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.AdvancedFeesScreen,
    Component: AdvancedFees,
    optionalFields: ['fees', 'treasuryAccountId']
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.AdvancedKeysScreen,
    Component: AdvancedKeys,
    optionalFields: ['keys']
  },
]

export default Steps
