import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import filter from 'lodash/filter';
import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import property from 'lodash/property';
import values from 'lodash/values';
import xor from 'lodash/xor';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';

import MirrorNode, { FetchAllNFTsResponseRow } from '@/services/MirrorNode';
import { TokenInfo } from '@utils/entity/TokenInfo';
import useHederaWallets from '@hooks/useHederaWallets';

import Scrollbar from '@/components/shared/layout/Scrollbar';
import Loader from '@components/shared/loader/Loader';
import NFT from '@/components/views/my-nft-collection/NFT';


type CollectionRowProps = {
  collection_id: string;
  nfts: FetchAllNFTsResponseRow[];
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

      const fetchedCollections =
        await MirrorNode.fetchAllNFTsGroupedByCollectionWithInfo(accountId);

      setCollections(fetchedCollections);
      setLoading(false);
    } catch (e) {
      // toast.error(e.message)
    }
  }, [userWalletId]);

  const selectedCollectionsNFTs = useMemo<FetchAllNFTsResponseRow[]>(() => {
    return collections
      ? selectedCollectionsId.length > 0
        ? flatMap(
            filter(collections, (collection) =>
              selectedCollectionsId.includes(collection.collection_id)
            ),
            property('nfts')
          )
        : flatMap(values(collections), property('nfts'))
      : [];
  }, [collections, selectedCollectionsId]);

  const renderCollectionsList = useCallback(() => collections && (
    <>
      <li
        className={classNames({
          active: isEmpty(selectedCollectionsId),
        })}
      >
        <label >
          <input
            type='checkbox'
            onClick={() => setSelectedCollectionsId([])}
          />
          <span>
            Show all NFTs
          </span>
        </label>
      </li>

      {map(collections, (collection) => (
        <li
          className={classNames({
            active: selectedCollectionsId.includes(
              collection.collection_id
            ),
          })}
        >
          <label >
            <input
              type='checkbox'
              onChange={() =>
                setSelectedCollectionsId(
                  xor(selectedCollectionsId, [collection.collection_id])
                )
              }
            />
            <span>
              {collection.collection_info.name}
            </span>
          </label>
        </li>
      ))}
    </>
  ), [collections, selectedCollectionsId]);

  const renderSelectedNFTs = useCallback(() => (
    map(selectedCollectionsNFTs, (nft) => {
      const collectionInfo = find(
        collections,
        (collection) => collection.collection_id === nft.token_id
      )?.collection_info;

      return <NFT {...nft} collectionInfo={collectionInfo} />;
    }
  )), [collections, selectedCollectionsNFTs]);

  const renderNFTs = useCallback(() => (
    selectedCollectionsNFTs && selectedCollectionsNFTs.length <= 0 ? (
      !selectedCollectionsId
        ? (
          <p>First mint some NFTs!</p>
        ) : (
          <p>You don't have any NFTs in this collection!</p>
        )
      ) : (
        <Scrollbar renderOn={{mobileSmall: false, mobile: false}}>
          <div className='my-nft-collection__nfts__grid'>
            {renderSelectedNFTs()}
          </div>
        </Scrollbar>
      )
  ), [renderSelectedNFTs, selectedCollectionsId, selectedCollectionsNFTs])

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className='dark-schema'>
      <div className='mc--h container--max-width container--padding container--max-height bg--transparent'>
        {!userWalletId ? (
          <div>Firstly, you need connect your wallet!</div>
        ) : (
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
                <div className='my-nft-collection__collections-list'>
                  <p className='title'>Your collections:</p>
                  <div className='my-nft-collection__collections-list__box'>
                    <Scrollbar>
                      <ul>
                        {renderCollectionsList()}
                      </ul>
                    </Scrollbar>
                  </div>
                </div>

                <div className='my-nft-collection__nfts'>
                  {renderNFTs()}
                </div>
              </div>
            </Scrollbar>
          )
        )}
      </div>
    </div>
  );
}
