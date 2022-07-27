import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MirrorNode from '@/services/MirrorNode';
import Loader from '@/components/shared/loader/Loader';
import Hero from '@/components/shared/layout/Hero';
import NFTOverviewView from '@/components/views/nft-overview';
import { NFTOverviewPageParams } from '@/utils/types/overview.types';
import { NFTInfoWithMetadata } from '@/utils/entity/NFTInfo';

export default function NFTOverview() {
  const { collectionId, serialNumber } = useParams<NFTOverviewPageParams>();
  const [isCollectionsLoading, setCollectionsLoading] = useState(true);
  const [edition, setEdition] = useState<NFTInfoWithMetadata | null>(null);
  const [collectionNFTs, setCollectionNFTs] = useState<NFTInfoWithMetadata[]>([]);

  const loadCollectionNfts = useCallback(async (tokenId) => {
    const loadedNfts = await MirrorNode.fetchNFTsInfoWithMetadata(tokenId);
    setCollectionNFTs(loadedNfts.reverse());

    setCollectionsLoading(false);
  }, [setCollectionNFTs, setCollectionsLoading]);

  const selectEdition = useCallback(async () => {
      const edition = collectionNFTs.find(el => el.serial_number === Number.parseInt(serialNumber))

      if(edition) {
        setEdition(edition);
      }
  }, [collectionNFTs, serialNumber]);


  useEffect(() => {
    loadCollectionNfts(collectionId);
  }, [
    loadCollectionNfts,
    collectionId,
  ]);

  useEffect(() => {
    if(isCollectionsLoading) {
      selectEdition();
    }
  }, [selectEdition, isCollectionsLoading, serialNumber])

  return (
    <>
      <Hero title={'NFT overview'} />
      {isCollectionsLoading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
        </div>
      ) : (
        <NFTOverviewView
          collectionId={collectionId}
          edition={edition}
          collectionNFTs={collectionNFTs}
        />
      )}
    </>
  );
}
