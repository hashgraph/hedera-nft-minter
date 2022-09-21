import OnChain from '@components/shared/minter-wizard/OnChain';
import OffChainBasis from '@components/shared/minter-wizard/OffChainBasis'
import OffChainPropertiesAndAttributes from '@components/shared/minter-wizard/OffChainPropertiesAndAttributes'
import AdvancedKeys from '@components/shared/minter-wizard/AdvancedKeys';
import AdvancedFees from '@components/shared/minter-wizard/AdvancedFees';

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
    fieldsForValidation: ['maxSupply', 'qty']
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.OffChainBasisScreen,
    Component: OffChainBasis,
    fieldsForValidation: ['name', 'symbol', 'edition_name', 'description', 'creator'],
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen,
    Component: OffChainPropertiesAndAttributes,
    fieldsForValidation: ['properties', 'attributes']
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.AdvancedFeesScreen,
    Component: AdvancedFees,
    fieldsForValidation: ['fees', 'treasuryAccountId']
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.AdvancedKeysScreen,
    Component: AdvancedKeys,
    fieldsForValidation: ['keys']
  },
]

export default Steps
