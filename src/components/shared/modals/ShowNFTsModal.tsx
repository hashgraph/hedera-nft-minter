import React, { useCallback, useEffect, useState } from 'react';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { TokenInfo } from '@utils/entity/TokenInfo';
import map from 'lodash/map';
import MirrorNode from '@/services/MirrorNode';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import Loader from '../loader/Loader';
import Grid from '../grid';
import NFT from '@/components/views/my-nft-collection/NFT';

interface ShowNFTsModalProps {
  info: TokenInfo,
  nfts?: NFTInfo[] | undefined;
}

export default function ShowNFTsModal(props: ShowNFTsModalProps) {
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<(NFTInfo & NFTMetadata & {info: TokenInfo})[] | null>(null)

  const loadMetadata = useCallback(async () => {
    try {
      const nftsWithMetadata = await Promise.all(map(props.nfts, async(nft) => ({
        ...nft,
        ...nft.metadata && await MirrorNode.fetchNFTMetadata(atob(nft.metadata)),
        info: props.info
      }))) as (NFTInfo & NFTMetadata & {info: TokenInfo})[]

      setNfts(nftsWithMetadata)
    } catch (e) {
      // toast.error(e.message)
    } finally {
      setLoading(false);
    }
  }, [props.info, props.nfts]);

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);


  return (
    <div>
      <h2>Your NFTs from {props.info.token_id}</h2>

      {loading ? (
        <Loader />
      ) : (
        <Grid className='modal--nfts-list'>
          <>
            {
              nfts &&
              nfts?.length > 0
                ? (
                  map(nfts, nft => (
                    <NFT
                      loading={loading}
                      key={`${ nft.token_id }.${ nft.serial_number }`}
                      {...nft}
                    />
                  ))
                ) : (
                  <p>
                    No NFTs in this collection yet.
                  </p>
              )
            }
          </>
        </Grid>
      )}
    </div>
  )
}
