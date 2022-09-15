import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import map from 'lodash/map';
import xor from 'lodash/xor';
import isEmpty from 'lodash/isEmpty';
import { CollectionRowProps } from '@/pages/my-nft-collection';
import Scrollbar from '@/components/shared/layout/Scrollbar';

type CollectionListProps = {
  collections: CollectionRowProps[] | null,
  selectedCollectionsId: string[],
  setSelectedCollectionsId: React.Dispatch<React.SetStateAction<string[]>>
}

export default function CollectionList({
  collections,
  selectedCollectionsId,
  setSelectedCollectionsId
} : CollectionListProps) {

  const clearSelectedCollectionsIds = useCallback(() => (
    setSelectedCollectionsId([])
  ), [setSelectedCollectionsId])

  const toggleCollectionId = useCallback((collectionId: string) => (
    setSelectedCollectionsId(
      xor(selectedCollectionsId, [collectionId])
    )
  ), [selectedCollectionsId, setSelectedCollectionsId])

  const renderCollectionsList = useCallback(() => (
    collections && (
      map(collections, (collection) => (
        <li
          key={`nft_collection-list_${ collection.collection_id }`}
          className={classNames({
            active: selectedCollectionsId.includes(collection.collection_id),
          })}
        >
          <label>
            <input
              type='checkbox'
              onChange={() => toggleCollectionId(collection.collection_id)}
            />
            <span>
              {collection.collection_info.name}
            </span>
          </label>
        </li>
      ))
    )
  ), [collections, selectedCollectionsId, toggleCollectionId]);

  const showAllNFTsButtonClassName = useMemo(() => (
    classNames({
      active: isEmpty(selectedCollectionsId),
    })
  ), [selectedCollectionsId])

  return (
    <div className='my-nft-collection__collections-list'>
      <p className='title'>Your collections:</p>
      <div className='my-nft-collection__collections-list__box'>
        <Scrollbar>
          <ul>
            <li
              className={showAllNFTsButtonClassName}
            >
              <label >
                <input
                  type='checkbox'
                  onClick={clearSelectedCollectionsIds}
                />
                <span>
                  Show all NFTs
                </span>
              </label>
            </li>

            {renderCollectionsList()}
          </ul>
        </Scrollbar>
      </div>
    </div>
  )
}
