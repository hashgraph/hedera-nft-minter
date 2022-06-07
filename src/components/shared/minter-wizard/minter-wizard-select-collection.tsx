import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormikContext } from 'formik';

import MirrorNode from '@/services/MirrorNode';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { TokenInfo } from '@/utils/entity/TokenInfo';
import { WizardValues } from '@/utils/const/minter-wizard';
import useHederaWallets from '@hooks/useHederaWallets';

import Loader from '@/components/shared/loader/Loader';
import FieldSelect from '@/components/shared/form/FieldSelect';
import CollectionSummary from '@/components/shared/minter-wizard/collection-summary';

export default function SelectCollection() {
  const { userWalletId } = useHederaWallets();
  const { values, setFieldValue } = useFormikContext<WizardValues>()
  const [isLoading, setLoading] = useState(true);
  const [collections, setCollections] = useState<{ nfts: NFTInfo[]; info: TokenInfo; }[]>([])

  const loadCollections = useCallback(async () => {
    if (!userWalletId) {
      throw new Error('First connect your wallet!');
    }
    const loadedCollections = await MirrorNode.fetchUserNFTs(userWalletId, {
      onlyAllowedToMint: true,
    });

    setCollections(loadedCollections);
    setFieldValue('name', loadedCollections[0]?.info.name);
    setFieldValue('symbol', loadedCollections[0]?.info.symbol);
    setFieldValue('token_id', loadedCollections[0]?.info.token_id);
    setLoading(false);
  }, [userWalletId, setCollections, setLoading, setFieldValue])

  const selectedCollection = useMemo(() => (
    collections.find(collection => collection.info.token_id === values.token_id)
  ), [values.token_id, collections]);

  useEffect(() => {
    setFieldValue('name', selectedCollection?.info.name)
    setFieldValue('symbol', selectedCollection?.info.symbol)
  }, [selectedCollection, setFieldValue]);

  useEffect(() => {
    if (userWalletId) {
      loadCollections()
    }
  }, [loadCollections, userWalletId]);

  return (
    <div>
      {isLoading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
          Gathering collections info...
        </div>
      ) : (
        <>
          <FieldSelect name='token_id'>
            {collections.map((collection, index) =>
              <option
                key={collection.info.token_id}
                value={collection.info.token_id as string}
              >
                {index + 1}. {collection.info.symbol} | {collection.info.name}
              </option>
            )}
          </FieldSelect>
          {selectedCollection && (
            <CollectionSummary size='big' collection={selectedCollection} />
          )}
        </>
      )}
    </div>
  );
}
