import SelectCollection from '@/components/shared/minter-wizard/SelectCollection';
import OffChainBasis from '@components/shared/minter-wizard/OffChainBasis'
import OffChainPropertiesAndAttributes from '@components/shared/minter-wizard/OffChainPropertiesAndAttributes'

export enum ExistingCollectionNewNFTWizardSteps {
  SelectCollectionScreen = 0,
  OffChainScreen = 1,
  OffChainPropertiesAndAttributesScreen = 2,
}

const Steps = [
  {
    creatorStep: ExistingCollectionNewNFTWizardSteps.SelectCollectionScreen,
    Component: SelectCollection,
    mandatoryFields: ['token_id', 'qty'],
  },
  {
    creatorStep: ExistingCollectionNewNFTWizardSteps.OffChainScreen,
    Component: OffChainBasis,
    optionalFields: ['edition_name', 'description', 'creator']
  },
  {
    creatorStep: ExistingCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen,
    Component: OffChainPropertiesAndAttributes,
    optionalFields: ['properties', 'attributes']
  },
]

export default Steps
