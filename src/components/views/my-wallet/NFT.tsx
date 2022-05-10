import './nft.scss';

import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import MirrorNode from '@/services/MirrorNode';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import Loader from '@components/shared/loader/Loader';
import placeholder from '@assets/images/placeholder.png';

interface NFTProps {
  nfts?: NFTInfo[] | undefined,
}

export default function NFT(props: NFTProps) {
  const { nfts } = props;
  const [meta, setMeta] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMetadata = useCallback(async (cid: string) => {
    try {
      const json = await MirrorNode.fetchNFTMetadata(cid);

      if (typeof json === 'object') {
        setMeta(json);
      }
    } catch (e) {
      // toast.error(e.message)
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (nfts && Array.isArray(nfts) && nfts[0]?.metadata) {
      loadMetadata(atob(nfts[0].metadata));
    } else {
      setLoading(false);
    }
  }, [loadMetadata, nfts]);

  return (
    <figure  className={classNames('nft', { 'nft__loading': loading })}>
      <div className='nft__image'>
        {loading ? (
          <Loader />
        ) : (
          meta?.image ? (
            <img src={`https://ipfs.io/ipfs/${ meta.image }`} alt='' />
          ) : (
            <img src={placeholder} alt='' />
          )
        )}
      </div>
      <figcaption>
        <p>{meta?.name}</p>
        <p>{meta?.description}</p>

        {/*<div className='nft__buttons'>*/}
        {/*  <button type='button'>*/}
        {/*    Send*/}
        {/*  </button>*/}
        {/*</div>*/}
      </figcaption>
    </figure>
  )
}
