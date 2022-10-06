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

import classNames from 'classnames'
import map from 'lodash/map'
import React from 'react'
import floatingNfts from '@utils/const/floating-nfts'
import './floating-collections.scss'

type FloatingCollectionsProps = {
  isVisible: boolean;
}

export default function FloatingCollections({isVisible} : FloatingCollectionsProps) {

  const cardClassName = classNames('floating-collections__card', {
    'floating-collections__card--is-visible': isVisible
  })

  return (
    <>
      <div className='floating-collections container--max-width'>
        <div className='floating-collections__container'>
          {map(floatingNfts, (card, index) => (
            <div className={cardClassName} key={`floating-collections__card.${ index }`}>
              <div className='floating-collections__card__image'>

                <img src={card.src} alt={`floating-collections__card__image.${ index }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
