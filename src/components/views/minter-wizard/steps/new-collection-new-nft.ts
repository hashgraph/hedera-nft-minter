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
    fieldsForValidation: ['name', 'symbol', 'edition_name', 'description', 'creator', 'image'],
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen,
    Component: OffChainPropertiesAndAttributes,
    fieldsForValidation: ['properties', 'attributes']
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.AdvancedFeesScreen,
    Component: AdvancedFees,
    fieldsForValidation: ['fees', 'treasuryAccountId'],
    requireConnectedWallet: true,
  },
  {
    creatorStep: NewCollectionNewNFTWizardSteps.AdvancedKeysScreen,
    Component: AdvancedKeys,
  },
]

export default Steps
