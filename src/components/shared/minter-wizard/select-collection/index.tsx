import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useFormikContext } from 'formik';

import { WizardValues } from '@/utils/const/minter-wizard';
import MirrorNode from '@/services/MirrorNode';

import useHederaWallets from '@hooks/useHederaWallets';
import { MinterWizardStepWrapperContext } from '@components/shared/minter-wizard/StepWrapper';
import { MinterWizardContext } from '@components/shared/minter-wizard/MinterWizardForm';

import Loader from '@/components/shared/loader/Loader';
import FieldSelect from '@/components/shared/form/FieldSelect';
import CollectionSummary from '@/components/shared/minter-wizard/collection-summary';
import FieldWrapper from '@components/shared/form/FieldWrapper';
import './select-collection.scss';

export default function SelectCollection() {
  const { userWalletId } = useHederaWallets();
  const { values, setFieldValue } = useFormikContext<WizardValues>()
  const [isLoading, setLoading] = useState(true);
  const { isNextButtonActive } = useContext(MinterWizardStepWrapperContext)

  const {
    collections,
    setCollections,
    creatorStepToBackFromSummary
   } = useContext(MinterWizardContext)

  const wasNotBackFromSummary = useMemo(() => (
    creatorStepToBackFromSummary <= 0
  ), [creatorStepToBackFromSummary])

  const fetchCollections = useCallback(async () => {

    if (!userWalletId) {
      throw new Error('First connect your wallet!');
    }
    const loadedCollections = await MirrorNode.fetchUserNFTs(userWalletId, {
      onlyAllowedToMint: true,
    });

    return loadedCollections
  }, [userWalletId])

  const loadCollections = useCallback(async () => {
    isNextButtonActive(true);

    if(!collections) {
      const loadedCollections = await fetchCollections()
      setCollections(loadedCollections)
    }

    if (collections && collections?.length > 0) {
      if(!values.token_id) {
        setFieldValue('name', collections[0]?.info.name);
        setFieldValue('symbol', collections[0]?.info.symbol);
        setFieldValue('token_id', collections[0]?.info.token_id);
        setFieldValue('maxSupply', collections[0]?.info.max_supply);
        setFieldValue('supplyType', collections[0]?.info.supply_type)
        setFieldValue('qty', 1);
      }

      isNextButtonActive(false);
    }

    setLoading(false);
  }, [isNextButtonActive, collections, values.token_id, fetchCollections, setCollections, setFieldValue])

  const selectedCollection = useMemo(() => (
    collections && collections.find(collection => collection.info.token_id === values.token_id)
  ), [values.token_id, collections]);

  useEffect(() => {
    if(wasNotBackFromSummary) {
      setFieldValue('name', selectedCollection?.info.name)
      setFieldValue('symbol', selectedCollection?.info.symbol)
      setFieldValue('maxSupply', selectedCollection?.info.max_supply);
      setFieldValue('supplyType', selectedCollection?.info.supply_type)
      setFieldValue('token_id', selectedCollection?.info.token_id);
    }
  }, [selectedCollection, setFieldValue, wasNotBackFromSummary]);

  useEffect(() => {
    if (userWalletId && wasNotBackFromSummary) {
      loadCollections()
    }
  }, [loadCollections, userWalletId, wasNotBackFromSummary]);

  const maxQtyNumber = useMemo(() => {
    const maxQty = parseInt(selectedCollection?.info.max_supply ?? '0')
      - (selectedCollection?.nfts?.length ?? 0)

    return maxQty >= 10 ? 10 : maxQty
  }, [selectedCollection])

  return (
    <div>
      {isLoading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
        </div>
      ) : (
        collections && collections.length > 0 ? (
          <div className='select-collection'>
            <h3>Select a collection where your NFT will be placed</h3>
            <label htmlFor='token_id'>Selected collection</label>
            <div className='select-collection__select-wrapper'>
              <FieldSelect name='token_id'>
                {collections.map((collection, index) => (
                  <option
                    key={collection.info.token_id}
                    value={collection.info.token_id as string}
                  >
                    {index + 1}. {collection.info.symbol} | {collection.info.name}
                  </option>
                ))}
              </FieldSelect>
              {selectedCollection && (
                <CollectionSummary collection={selectedCollection} />
              )}
            </div>

            <FieldWrapper
              fastField
              name='qty'
              type='number'
              label='This is the number of NFTs you can mint now.'
              max={maxQtyNumber}
              min={1}
            />
          </div>
        ) : (
          <div className='select-collection--not-found'>
            <h3>Sorry! We cannot find any of your existing collections.</h3>
            <p>First, you need to create a new collection and then you will be able to
              add more NFTs to the existing collection.
            </p>
          </div>
        )
      )}
    </div>
  );
}
