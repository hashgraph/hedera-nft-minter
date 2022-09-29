import React, { useCallback, useEffect, useMemo, useState } from 'react';
import filter from 'lodash/filter';
import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import property from 'lodash/property';
import values from 'lodash/values';
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';

import MirrorNode from '@/services/MirrorNode';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { TokenInfo } from '@utils/entity/TokenInfo';
import useHederaWallets from '@hooks/useHederaWallets';

import Scrollbar from '@/components/shared/layout/Scrollbar';
import Loader from '@components/shared/loader/Loader';
import NFT from '@/components/views/my-nft-collection/NFT';
import CollectionList from '@/components/views/my-nft-collection/CollectionList';

export type CollectionRowProps = {
  collection_id: string;
  nfts: NFTInfo[];
  collection_info: TokenInfo;
}

export default function MyNFTCollection() {
  const { userWalletId } = useHederaWallets();
  const [collections, setCollections] = useState<CollectionRowProps[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [selectedCollectionsId, setSelectedCollectionsId] = useState<string[]>([]);

  const load = useCallback(async () => {
    try {
      const accountId = userWalletId ?? null;

      if (!accountId) {
        throw new Error('No account ID');
      }

      const fetchedNfts = await MirrorNode.fetchAllNFTs(accountId)
      const groupedFetchedNfts = groupBy(fetchedNfts, 'token_id');
      const groupedCollections = await MirrorNode.fetchCollectionInfoForGroupedNFTs(groupedFetchedNfts);

      setCollections(groupedCollections);
      setLoading(false);
    } catch (e) {
      // toast.error(e.message)
    }
  }, [userWalletId]);

  const selectedCollections = useMemo(() => (
    selectedCollectionsId.length > 0 ? (
      filter(collections, (collection) => (
        selectedCollectionsId.includes(collection.collection_id)
      ))
    ) : (
      values(collections)
    )
  ), [collections, selectedCollectionsId])

  const selectedCollectionsNFTs = useMemo<NFTInfo[]>(() => (
    collections ? (
      flatMap(selectedCollections, property('nfts'))
    ) : (
      []
    )
  ), [collections, selectedCollections]);

  const renderSelectedNFTs = useCallback(() => (
    map(selectedCollectionsNFTs, (nft) => {
      const collectionInfo = find(
        collections,
        (collection) => collection.collection_id === nft.token_id
      )?.collection_info;

      return (
        <NFT
          key={`nft_${ nft.token_id }.${ nft.serial_number }-card`}
          {...nft}
          collectionInfo={collectionInfo}
        />
      );
    }
  )), [collections, selectedCollectionsNFTs]);

  const renderSelectedCollectionError = useCallback(() => (
    !selectedCollectionsId
      ? (
        <p>First mint some NFTs!</p>
      ) : (
        <p>You don't have any NFTs in this collection!</p>
      )
  ), [selectedCollectionsId])

  const renderNFTs = useCallback(() => (
    selectedCollectionsNFTs && selectedCollectionsNFTs.length <= 0 ? (
      renderSelectedCollectionError()
    ) : (
      <Scrollbar renderOn={{mobileSmall: false, mobile: false}}>
        <div className='my-nft-collection__nfts__grid'>
          {renderSelectedNFTs()}
        </div>
      </Scrollbar>
    )
  ), [renderSelectedCollectionError, renderSelectedNFTs, selectedCollectionsNFTs])

  useEffect(() => {
    load();
  }, [load]);

  const renderUserNfts = useCallback(() => (
    loading ? (
      <div className='my-nft-collection__loader-wrapper'>
        <Loader />
      </div>
    ) : (
      <Scrollbar
        renderOn={{
          tablet: false,
          laptop: false,
          desktop: false,
          desktopWide: false,
          desktopExtraWide: false
        }}
      >
        <div className='my-nft-collection'>
          <CollectionList
            setSelectedCollectionsId={setSelectedCollectionsId}
            selectedCollectionsId={selectedCollectionsId}
            collections={collections}
          />

          <div className='my-nft-collection__nfts'>
            {renderNFTs()}
          </div>
        </div>
      </Scrollbar>
    )
  ), [collections, loading, renderNFTs, selectedCollectionsId])

  return (
    <div className='dark-schema'>
      <div className='mc--h container--padding container--max-height bg--transparent'>
        {!userWalletId ? (
          <div>Firstly, you need connect your wallet!</div>
        ) : (
          renderUserNfts()
        )}
      </div>
    </div>
  );
}
