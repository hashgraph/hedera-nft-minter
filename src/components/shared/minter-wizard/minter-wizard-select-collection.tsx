import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MirrorNode from '@/services/MirrorNode';
import useHederaWallets from '@hooks/useHederaWallets';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { TokenInfo } from '@/utils/entity/TokenInfo';
import Loader from '@/components/shared/loader/Loader';
import FieldSelect from '@/components/shared/form/FieldSelect';
import { useFormikContext } from 'formik';
import { WizardValues } from '@/utils/const/minter-wizard';
import CollectionSummary from '@/components/shared/minter-wizard/collection-summary';

export default function SelectCollection() {
  const [collections, setCollections] = useState<{ nfts: NFTInfo[]; info: TokenInfo; }[]>([])
  const { userWalletId } = useHederaWallets();
  const [isLoading, setLoading] = useState(true);
  const { values, setFieldValue } = useFormikContext<WizardValues>()

  const loadCollections = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('First connect your wallet!')
    }
    const loadedCollections = await MirrorNode.fetchUserNFTsCollectionsCanBeMintend(userWalletId)
    setCollections(loadedCollections)
    setFieldValue('name', loadedCollections[0]?.info.name)
    setFieldValue('symbol', loadedCollections[0]?.info.symbol)
    setFieldValue('token_id', loadedCollections[0]?.info.token_id)
    setLoading(false);
  }, [userWalletId, setCollections, setLoading, setFieldValue])

  useEffect(() => {
    if (userWalletId) {
      loadCollections()
    }
  }, [loadCollections, userWalletId])

  const selectedCollection = useMemo(
    () => {
      const collection = collections.find(collection => collection.info.token_id === values.token_id)
      setFieldValue('name', collection?.info.name)
      setFieldValue('symbol', collection?.info.symbol)
      return collection
    }, [values.token_id, collections, setFieldValue])

  return (
    <div>
      {isLoading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
          Gathering collections info...
        </div>
      ) : (
        <>
          <pre>
            {JSON.stringify(collections, null, 2)}
          </pre>
          <FieldSelect name='token_id'>
            {collections.map((collection, index) =>
              <option
                key={collection.info.token_id}
                value={collection.info.token_id as string}
              >
                {index + 1}. {collection.info.symbol} | {collection.info.name}
              </option>)}
          </FieldSelect>
          {selectedCollection &&
            <CollectionSummary size='big' collection={selectedCollection} />
          }
        </>
      )}
    </div>
  );
}
