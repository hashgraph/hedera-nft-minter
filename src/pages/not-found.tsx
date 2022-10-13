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
import { Link } from 'react-router-dom'
import HederaLogoWide from '@assets/images/logo.svg'
import Scrollbar from '@components/shared/layout/Scrollbar'

export default function NotFound() {
  return (
    <div className='mc--h container--padding container--max-height bg--transparent'>
      <Scrollbar>
        <div className='not-found'>
          <p className='title'>
            404 Not found
          </p>
          <p className='title--small'>
            Sorry we cannot found page what you looking for.
          </p>
          <img src={HederaLogoWide} alt='hedera_banner' />
          <p className='title--small'>This page doesn't exist. Try another or go back to home page.</p>
          <Link to='/' >Back to home.</Link>
        </div>
      </Scrollbar>
    </div>
  )
}
