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

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import MirrorNode from '@services/MirrorNode';
import { TokenInfo } from '@utils/entity/TokenInfo';
import renderValue from '@utils/helpers/renderValue';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { HEDERA_NETWORK } from '@src/../Global.d';

import Loader from '@components/shared/loader/Loader';

import placeholder from '@assets/images/placeholder.png';
import './nft.scss';
import formatToIPFSImageLink from '@utils/helpers/formatToIPFSImageLink';

type NFTProps = NFTInfo & {
  collectionInfo?: TokenInfo
}

export default function NFT({ metadata, serial_number, collectionInfo }: NFTProps) {
  const [loadedMetadata, setLoadedMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadMetadata = useCallback(async () => {
    const fetchedMetadata = await MirrorNode.fetchNFTMetadata(atob(metadata));

    setLoadedMetadata(fetchedMetadata);
    setIsLoading(false);
  }, [metadata, setLoadedMetadata]);

  const previewImageSrc = useMemo(() => (
    loadedMetadata?.image ? (
      formatToIPFSImageLink(loadedMetadata.image)
    ) : (
      placeholder
    )
  ), [loadedMetadata?.image])

  const nftCardClassnames = useMemo(() => (
    classNames('nft-card', { nft__isLoading: isLoading })
  ), [isLoading])

  const nftCardImageClassnames = useMemo(() => (
    classNames({placeholder: !loadedMetadata?.image})
  ), [loadedMetadata?.image])

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);

  return (
    <a
      href={`https://hashscan.io/${ HEDERA_NETWORK }/token/${ collectionInfo?.token_id }`}
      target='_blank'
      className={nftCardClassnames}
    >
      {isLoading ? (
        <div className='nft-card__loader'>
          <Loader />
        </div>
      ) : (
        <>
          <div className='nft-card__image'>
            <img
              className={nftCardImageClassnames}
              src={previewImageSrc}
              alt='nft_image'
            />
          </div>

          <div className='nft-card__content'>
            <p className='nft-card__name'>
              {renderValue(loadedMetadata?.name, '(no name)')}
            </p>
            <p className='nft-card__collection-name'>
              {collectionInfo?.name}
            </p>
            <p className='nft-card__serial'>
              Serial: {serial_number}
            </p>
          </div>

          <div className='nft-card__buttons'>
            <p className='hashscan'>
              {collectionInfo?.token_id}
            </p>
          </div>
        </>
      )}
    </a>
  );
}
