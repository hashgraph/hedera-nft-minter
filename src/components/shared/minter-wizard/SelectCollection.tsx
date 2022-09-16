import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useFormikContext } from 'formik';

import { WizardValues } from '@/utils/const/minter-wizard';
import MirrorNode from '@/services/MirrorNode';

import useHederaWallets from '@hooks/useHederaWallets';
import { MinterWizardStepWrapperContext } from '@components/shared/minter-wizard/StepWrapper';
import { MinterWizardContext } from '@/components/views/minter-wizard';
import { TokenSupplyType } from '@/utils/entity/TokenInfo';

import loadingHammer from '@assets/images/loading_hammer.svg'
import FieldSelect from '@/components/shared/form/FieldSelect';
import FieldWrapper from '@components/shared/form/FieldWrapper';


export default function SelectCollection() {
  const { userWalletId } = useHederaWallets();
  const { values, setFieldValue } = useFormikContext<WizardValues>()
  const [isLoading, setLoading] = useState(true);
  const { setNextButtonHidden } = useContext(MinterWizardStepWrapperContext)

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
    setNextButtonHidden(true);

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

      setNextButtonHidden(false);
    }

    setLoading(false);
  }, [setNextButtonHidden, collections, values.token_id, fetchCollections, setCollections, setFieldValue])

  const selectedCollection = useMemo(() => (
    collections && collections.find(collection => collection.info.token_id === values.token_id)
  ), [values.token_id, collections]);

  useEffect(() => {
    setNextButtonHidden(true)
  }, [setNextButtonHidden])

  useEffect(() => {
    if(wasNotBackFromSummary) {
      setFieldValue('name', selectedCollection?.info.name)
      setFieldValue('symbol', selectedCollection?.info.symbol)
      setFieldValue('maxSupply', selectedCollection?.info.max_supply);
      setFieldValue('supplyType', selectedCollection?.info.supply_type)
      setFieldValue('token_id', selectedCollection?.info.token_id);
      setFieldValue('qty', 1);
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

    return (maxQty >= 10 || maxQty < 0) ? 10 : maxQty
  }, [selectedCollection])

  return (
    <div>
      {isLoading ? (
        <div className='minter-wizard__summary__loader'>
          <img src={loadingHammer} alt='loader_hammer' />
          <p className='title title--small title--strong'>
            Fetching <br />
            your collections...
          </p>
        </div>
      ) : (
        collections && collections.length > 0 ? (
          <div className='minter-wizard__select-collection'>
            <p className='title'><span className='title--strong'>Select a collection</span> where your NFT will be placed</p>
            <div className='minter-wizard__select-collection__wrapper'>
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
                <div className='minter-wizard__select-collection__summary'>
                  <div className='values'>
                    <p>
                      Max supply:{' '}
                      <b>
                        {selectedCollection?.info.supply_type === TokenSupplyType.INFINITE
                           ? TokenSupplyType.INFINITE
                           : selectedCollection?.info?.max_supply
                        }
                      </b>
                    </p>
                    <p>
                      Tokens minted: <b>{selectedCollection?.nfts?.length}</b>
                    </p>
                    <p>
                      {selectedCollection?.info?.supply_type !== TokenSupplyType.INFINITE && (
                        <>
                          Left to mint: <b>{
                            parseInt(selectedCollection.info.max_supply ?? '0')
                            - selectedCollection.nfts.length
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
      )}
    </div>
  );
}
