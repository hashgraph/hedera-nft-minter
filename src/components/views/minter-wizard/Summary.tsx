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

import React, { useCallback, useMemo } from 'react';
import map from 'lodash/map';
import pick from 'lodash/pick';
import { FormikValues } from 'formik';
import { Link } from 'react-router-dom';
import { HEDERA_NETWORK } from '@src/../Global.d';
import Scrollbar from '@components/shared/layout/Scrollbar';
import placeholder from '@assets/images/placeholder.png';
import externalIcon from '@assets/images/icons/external.svg';
import nftIcon from '@assets/images/icons/nft_icon.svg';

export default function Summary({ mintedNFTData }: { mintedNFTData: FormikValues }) {
  const summaryValues = useMemo(() => (
    map(pick(mintedNFTData, ['name', 'symbol', 'edition_name', 'creator', 'description']))
  ), [mintedNFTData])

  const renderSummaryValuesList = useCallback(() => (
    map(summaryValues, value => (
      <React.Fragment key={value}>
        {value && (
          <li>
            <p>
              {value}
            </p>
          </li>
        )}
      </React.Fragment>
    ))
  ), [summaryValues])

  const hashScanLink = useMemo(() => (
    `https://hashscan.io/${ HEDERA_NETWORK }/token/${ mintedNFTData.tokenId }`
  ), [mintedNFTData.tokenId])

  return (
    <Scrollbar>
      <div className='minter-wizard__summary__content minter-wizard__animation-container minter-wizard__summary--final'>
        <div className='minter-wizard__summary__image'>
          <img
            src={mintedNFTData?.image
              ? URL.createObjectURL(mintedNFTData?.image)
              : placeholder
            }
            alt='Thumb'
          />
        </div>
        <div className='minter-wizard__summary__column minter-wizard__summary__column--gutter-left'>
          <div>
            <p className='title title--strong'>Congratulations!</p>
            <p className='title title--small'>Your NFT has been minted!</p>
          </div>
          <ul className='minter-wizard__summary__item-list'>
            {renderSummaryValuesList()}
            <li className='green'>MINTED</li>
          </ul>

          <div className='minter-wizard__summary__token-id'>
            <img src={nftIcon} alt='nft_icon' />
            {mintedNFTData.tokenId}
          </div>

          <a
            href={hashScanLink}
            target='_blank'
            className='minter-wizard__summary__hashscan'
          >
            <img src={externalIcon} alt='external_icon' />
            <p>
              View token on <span>Hashscan.io</span>
            </p>
          </a>

          <Link to='/my-nft-collection' className='minter-wizard__summary__collection btn btn--arrow'>
            View your collection
          </Link>
        </div>
      </div>
    </Scrollbar>
  )
}
