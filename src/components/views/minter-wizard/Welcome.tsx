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

import { useContext } from 'react';
import { FormWizardSteps, HomepageContext } from '@utils/context/HomepageContext';
import { MintTypes } from '@utils/entity/MinterWizard'
import ButtonGroup from '@components/shared/form/button-group'
import Scrollbar from '@components/shared/layout/Scrollbar'

export default function Welcome() {
  const {
    setCreatorStep
  } = useContext(HomepageContext);
  
  return (
    <div className='minter-wizard__step minter-wizard__welcome minter-wizard__animation-container'>
      <Scrollbar>
        <div className='minter-wizard__step__wrapper minter-wizard__welcome__container'>
          <h1 className='title title--welcome'>
            Mint your <br />
            Hedera NFT here:
          </h1>
          <ButtonGroup
            direction='column'
            name='mint_type'
            options={[
              {
                label: <>New Collection</>,
                value: MintTypes.NewCollectionNewNFT,
                onClick: () => setCreatorStep(FormWizardSteps.MinterScreen),
                renderArrow: true
              },
              {
                label: <>Existing Collection</>,
                value: MintTypes.ExistingCollectionNewNFT,
                onClick: () => setCreatorStep(FormWizardSteps.MinterScreen),
                renderArrow: true
              },
            ]}
          />
          <div className='minter-wizard__slogan'>
            <h2>
              fastest. <br />
              easiest. <br />
              most sustainable.
            </h2>
          </div>
        </div>
      </Scrollbar>
    </div>
  )
}
