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

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import map from 'lodash/map';
import find from 'lodash/find';

import filter from 'lodash/filter';
import flatMap from 'lodash/flatMap';
import property from 'lodash/property';
import values from 'lodash/values';

import { NFTInfo } from '@utils/entity/NFTInfo';

import useHederaWallets from '@hooks/useHederaWallets';
import useHederaAccountNFTs from '@src/utils/hooks/useHederaAccountNFTs';

import Scrollbar from '@components/shared/layout/Scrollbar';
import Loader from '@components/shared/loader/Loader';
import NFT from '@components/views/my-nft-collection/NFT';
import CollectionList from '@components/views/my-nft-collection/CollectionList';

export default function MyNFTCollection() {
  const { userWalletId } = useHederaWallets();
  const [selectedCollectionsId, setSelectedCollectionsId] = useState<string[]>([]);
  const {
    collections,
    loading,
    fetchHederaAccountNFTs
  } = useHederaAccountNFTs(userWalletId)

  useEffect(() => {
    fetchHederaAccountNFTs();
  }, [fetchHederaAccountNFTs]);

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
  ), [collections, loading, renderNFTs, selectedCollectionsId, setSelectedCollectionsId])

  return (
    <div className='mc--h container--padding container--max-height bg--transparent'>
      {!userWalletId ? (
        <div>Firstly, you need connect your wallet!</div>
      ) : (
        renderUserNfts()
      )}
    </div>
  );
}
