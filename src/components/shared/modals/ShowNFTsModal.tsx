import React, { useCallback, useEffect, useState } from 'react';
import map from 'lodash/map';
import { NFTInfo } from '@utils/entity/NFTInfo';
import { TokenInfo } from '@utils/entity/TokenInfo';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import MirrorNode from '@/services/MirrorNode';
import Loader from '@components/shared/loader/Loader';
import Grid from '@components/shared/grid';
import NFT from '@/components/views/my-nft-collection/NFT';

interface ShowNFTsModalProps {
  info: TokenInfo,
  nfts?: NFTInfo[] | undefined;
}

export default function ShowNFTsModal({nfts, info}: ShowNFTsModalProps) {
  const [loading, setLoading] = useState(true);
  const [nftsWithMetadata, setNftsWithMetadata] = useState<(NFTInfo & NFTMetadata & {info: TokenInfo})[]>([])

  const loadMetadata = useCallback(async () => {
    try {
      if(nfts) {
        const nftsMetadata = await Promise.all(nfts.map(nft => MirrorNode.fetchNFTMetadata(atob(nft.metadata))))

        const nftsWithCollectionInfoAndMetadata = map(nfts, (nft, i) => {
          return {
            ...nft,
            ...nftsMetadata[i],
            info
          }
        })

        setNftsWithMetadata(nftsWithCollectionInfoAndMetadata)
      }
    } catch (e) {
      // toast.error(e.message)
    } finally {
      setLoading(false);
    }
  }, [info, nfts, setNftsWithMetadata]);

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);


  return (
    <div>
      <h2>Your NFTs from {info.token_id}</h2>

      {loading ? (
        <Loader />
      ) : (
        <Grid className='modal--nfts-list'>
          <>
            {nftsWithMetadata && nftsWithMetadata?.length > 0
              ? (
                map(nftsWithMetadata, nft => (
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
