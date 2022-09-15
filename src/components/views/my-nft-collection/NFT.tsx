import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import MirrorNode, { FetchAllNFTsResponseRow } from '@/services/MirrorNode';
import { TokenInfo } from '@utils/entity/TokenInfo';
import renderValue from '@/utils/helpers/renderValue';

import Loader from '@components/shared/loader/Loader';

import placeholder from '@assets/images/placeholder.png';
import './nft.scss';

type NFTProps = FetchAllNFTsResponseRow & {
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

  const showPlaceholder = useMemo(() => (
    loadedMetadata?.image
  ), [loadedMetadata?.image])

  const previewImageSrc = useMemo(() => (
    (showPlaceholder && loadedMetadata?.image)
      ? (
        loadedMetadata.image.includes('https://')
        ? loadedMetadata.image
        : `https://ipfs.io/ipfs/${ loadedMetadata.image.replace('ipfs://', '') }`
      ) : (
        placeholder
      )
  ), [loadedMetadata?.image, showPlaceholder])

  const nftCardClassnames = useMemo(() => (
    classNames('nft-card', { nft__isLoading: isLoading })
  ), [isLoading])

  const nftCardImageClassnames = useMemo(() => (
    classNames({placeholder: !showPlaceholder})
  ), [showPlaceholder])

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);

  return (
    <a
      href={`https://hashscan.io/#/testnet/token/${ collectionInfo?.token_id }`}
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
              Hashscan.io
            </p>
          </div>
        </>
      )}
    </a>
  );
}
