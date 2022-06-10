import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormikContext } from 'formik';

import { initialValues , WizardValues } from '@/utils/const/minter-wizard';
import MirrorNode from '@/services/MirrorNode';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { TokenInfo } from '@/utils/entity/TokenInfo';

import useHederaWallets from '@hooks/useHederaWallets';

import Loader from '@/components/shared/loader/Loader';
import FieldSelect from '@/components/shared/form/FieldSelect';
import CollectionSummary from '@/components/shared/minter-wizard/collection-summary';
import './minter-wizard-select-collection.scss';
import pick from 'lodash/pick';

export default function SelectCollection() {
  const { userWalletId } = useHederaWallets();
  const { values, setFieldValue, resetForm } = useFormikContext<WizardValues>()
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
    setLoading(false);
    setFieldValue('name', loadedCollections[0]?.info.name);
    setFieldValue('symbol', loadedCollections[0]?.info.symbol);
    setFieldValue('token_id', loadedCollections[0]?.info.token_id);
    setFieldValue('maxSupply', loadedCollections[0]?.info.max_supply);
  }, [userWalletId, setCollections, setLoading, setFieldValue])

  const selectedCollection = useMemo(() => (
    collections.find(collection => collection.info.token_id === values.token_id)
  ), [values.token_id, collections]);

  useEffect(() => {
    setFieldValue('name', selectedCollection?.info.name)
    setFieldValue('symbol', selectedCollection?.info.symbol)
    setFieldValue('maxSupply', selectedCollection?.info.max_supply);
    setFieldValue('token_id', selectedCollection?.info.token_id);

  }, [selectedCollection, setFieldValue]);

  useEffect(() => {
    if (userWalletId) {
      loadCollections()
    }
  }, [loadCollections, userWalletId]);

  useEffect(()=>{
    resetForm({values: {
      ...values,
      ...pick(initialValues, [
        'edition_name',
        'serial_metadata',
        'creator',
        'creatorDID',
        'image',
        'files',
        'properties',
        'attributes',
        'qty',
        'keys',
        'fees'
      ])
    }})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm])

  return (
    <div>
      {isLoading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
          <p>Gathering collections info...</p>
        </div>
      ) : (
        <div className='select-collection'>
          <h3>Select collection where NFT will appear</h3>

          <label htmlFor='token_id'>Collection</label>
          <div className='select-collection__select-wrapper'>
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
          </div>

          {selectedCollection && (
            <CollectionSummary collection={selectedCollection} />
          )}
        </div>
      )}
    </div>
  );
}
