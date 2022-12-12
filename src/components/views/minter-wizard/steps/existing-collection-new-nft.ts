/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import SelectCollection from '@components/shared/minter-wizard/SelectCollection';
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
    fieldsForValidation: ['token_id', 'qty'],
  },
  {
    creatorStep: ExistingCollectionNewNFTWizardSteps.OffChainScreen,
    Component: OffChainBasis,
    fieldsForValidation: ['edition_name', 'description', 'creator', 'image']
  },
  {
    creatorStep: ExistingCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen,
    Component: OffChainPropertiesAndAttributes,
    fieldsForValidation: ['properties', 'attributes']
  },
]

export default Steps
