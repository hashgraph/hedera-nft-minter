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

import React from 'react'
import classNames from 'classnames'
import map from 'lodash/map'
import keys from 'lodash/keys'
import { CSSTransition } from 'react-transition-group'
import HederaLogoBlack from '@assets/images/floating-logos/hedera-hbar-logo-black.png'
import HederaLogoWhite from '@assets/images/floating-logos/circle-logo-hedera.webp'
import './floating-logos.scss'

type FloatingLogosProps = {
  isVisible: boolean;
}

export default function FloatingLogos({isVisible} : FloatingLogosProps) {

  const cardClassName = classNames('floating-logos__card', {
    'floating-logos__card--is-visible': isVisible
  })

  return (
    <>
      <CSSTransition
        in={isVisible}
        classNames='floating-logos--fade'
        timeout={1000}
      >
        <div className='floating-logos container--max-width'>
          <div className='floating-logos__container'>
            {map(keys([...new Array(25)]), (index) => (
              <div className={cardClassName} key={`floating-logos__card.${ index }`}>
                <div className='floating-logos__card__image'>
                  <img
                    src={parseInt(index) % 2 === 0 ? HederaLogoBlack : HederaLogoWhite}
                    alt={`floating-logos__card__image.${ index }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}
