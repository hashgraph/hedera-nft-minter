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

import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';

import { WizardValues } from '@utils/const/minter-wizard';

import useHederaWallets from '@hooks/useHederaWallets';
import useHederaAccountNFTs from '@src/utils/hooks/useHederaAccountNFTs';
import { MinterWizardStepWrapperContext } from '@components/shared/minter-wizard/StepWrapper';
import { MinterWizardContext } from '@components/views/minter-wizard';
import { TokenSupplyType } from '@utils/entity/TokenInfo';

import loadingHammer from '@assets/images/loading_hammer.svg'
import FieldSelect from '@components/shared/form/FieldSelect';
import FieldWrapper from '@components/shared/form/FieldWrapper';

const CONNECT_WALLET_FIRST_MESSAGE = 'Connect wallet first!'
const FETCHING_COLLECTION_IN_PROGRESS_MESSAGE = 'Fetching collections is in progress...'

export const NO_COLLECTIONS_FOUND_MESSAGE = 'No collections found!'

export default function SelectCollection() {
  const { userWalletId } = useHederaWallets();
  const { values, setFieldValue, resetForm, validateField } = useFormikContext<WizardValues>()
  const { setNextButtonHidden } = useContext(MinterWizardStepWrapperContext)
  const { creatorStepToBackFromSummary } = useContext(MinterWizardContext)
  const {
    collections,
    loading,
    fetchHederaAccountNFTs
  } = useHederaAccountNFTs(userWalletId)

  const wasNotBackFromSummary = useMemo(() => (
    creatorStepToBackFromSummary <= 0
  ), [creatorStepToBackFromSummary])
  
  const selectedCollection = useMemo(() => (
    collections && (
      collections.find(collection => collection.collection_id === values.token_id) ?? collections[0]
    )
  ), [collections, values.token_id]);

  const maxQtyNumber = useMemo(() => {
    const maxQty = parseInt(selectedCollection?.collection_info.max_supply ?? '0')
      - parseInt(selectedCollection?.collection_info.total_supply ?? '0')

    return (maxQty >= 10 || maxQty <= 0) ? 10 : maxQty
  }, [selectedCollection])

  useEffect(() => {
    const loggedWithoutCollections = !!userWalletId && values.name == NO_COLLECTIONS_FOUND_MESSAGE && values.symbol === NO_COLLECTIONS_FOUND_MESSAGE

    setNextButtonHidden((!collections || loading || !userWalletId) || loggedWithoutCollections)
  }, [collections, loading, setNextButtonHidden, userWalletId, values.name, values.symbol])

  const prepareCollections = useCallback(async () => {
    if (wasNotBackFromSummary && userWalletId) {
      setFieldValue('name', FETCHING_COLLECTION_IN_PROGRESS_MESSAGE);
      setFieldValue('symbol', FETCHING_COLLECTION_IN_PROGRESS_MESSAGE);

      const fetchedCollections = await fetchHederaAccountNFTs({
        onlyAllowedToMint: true
      })

      if (fetchedCollections && fetchedCollections?.length > 0) {
        const maxSupply = parseInt(fetchedCollections[0]?.collection_info?.max_supply ?? '0') > 10 ? (
          10
        ) : (
          fetchedCollections[0]?.collection_info.max_supply
        )

        setFieldValue('name', fetchedCollections[0]?.collection_info.name);
        setFieldValue('symbol', fetchedCollections[0]?.collection_info.symbol);
        setFieldValue('token_id', fetchedCollections[0]?.collection_id);
        setFieldValue('maxSupply', maxSupply);
        setFieldValue('supplyType', fetchedCollections[0]?.collection_info.supply_type)
        setFieldValue('qty', 1);
      } else {
        setFieldValue('name', NO_COLLECTIONS_FOUND_MESSAGE);
        setFieldValue('symbol', NO_COLLECTIONS_FOUND_MESSAGE);
      }
    }
  }, [fetchHederaAccountNFTs, setFieldValue, userWalletId, wasNotBackFromSummary])

  useEffect(() => {
    prepareCollections()
  }, [prepareCollections]);

  useEffect(() => {
    if (wasNotBackFromSummary) {
      setFieldValue('name', selectedCollection?.collection_info.name)
      setFieldValue('symbol', selectedCollection?.collection_info.symbol)
      setFieldValue('maxSupply', selectedCollection?.collection_info.max_supply);
      setFieldValue('supplyType', maxQtyNumber)
      setFieldValue('token_id', selectedCollection?.collection_id);
      setFieldValue('qty', 1);
      setFieldValue('leftToMint', maxQtyNumber)
    }
  }, [maxQtyNumber, selectedCollection, setFieldValue, wasNotBackFromSummary])

  useEffect(() => {
    if (!userWalletId) {
      resetForm({
        values: {
          ...values,
          token_id: '',
          name: CONNECT_WALLET_FIRST_MESSAGE,
          symbol: CONNECT_WALLET_FIRST_MESSAGE,
        }
      })

      validateField('token_id')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm, userWalletId, validateField])

  const renderCollections = useCallback(() => (
    collections && collections.length > 0 ? (
      <div className='minter-wizard__select-collection'>
        <p className='title'><span className='title--strong'>Select a collection</span> where your NFT will be placed</p>
        <div className='minter-wizard__select-collection__wrapper'>
          <FieldSelect name='token_id'>
            {collections.map((collection, index) => (
              <option
                key={collection.collection_id}
                value={collection.collection_id}
              >
                {index + 1}. {collection.collection_info.symbol} | {collection.collection_info.name}
              </option>
            ))}
          </FieldSelect>
          {selectedCollection && (
            <div className='minter-wizard__select-collection__summary'>
              <div className='values'>
                <p>
                  Max supply:{' '}
                  <b>
                    {selectedCollection?.collection_info.supply_type === TokenSupplyType.INFINITE
                       ? TokenSupplyType.INFINITE
                       : selectedCollection?.collection_info?.max_supply
                    }
                  </b>
                </p>
                <p>
                  Tokens minted: <b>{selectedCollection.collection_info.total_supply}</b>
                </p>
                <p>
                  {selectedCollection?.collection_info?.supply_type !== TokenSupplyType.INFINITE && (
                    <>
                      Left to mint: <b>{
                        parseInt(selectedCollection.collection_info.max_supply ?? '0')
                        - parseInt(selectedCollection.collection_info.total_supply ?? '0')
                      }</b>
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className='minter-wizard__on-chain__input-row'>
          <label htmlFor='maxSupply' className='title--strong title--medium'>
            # of <br />
            NFTs to <br />
            mint now:
          </label>
          <FieldWrapper
            fastField
            name='qty'
            type='number'
            maxLength={2}
            max={maxQtyNumber}
            min={1}
            hideCharLimit
          />
        </div>
      </div>
    ) : (
      <div className='minter-wizard__select-collection--not-found'>
        <h3>Sorry! We cannot find any of your existing collections.</h3>
        <p>First, you need to create a new collection and then you will be able to
          add more NFTs to the existing collection.
        </p>
      </div>
    )
  ), [collections, maxQtyNumber, selectedCollection])

  const renderUserCollections = useCallback(() => (
    loading ? (
      <div className='minter-wizard__summary__loader'>
        <img src={loadingHammer} alt='loader_hammer' />
        <p className='title title--small title--strong'>
          Fetching <br />
          your collections...
        </p>
      </div>
    ) : (
      renderCollections()
    )
  ), [loading, renderCollections])

  return (
    <div>
      {userWalletId ? (
        renderUserCollections()
      ) : (
        <div>
          <p className='title--small'>
            Please connect your wallet first!
          </p>
        </div>
      )}
    </div>
  );
}
