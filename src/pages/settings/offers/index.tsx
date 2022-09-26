import { Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useHederaWallets from '@/utils/hooks/useHederaWallets'
import CollectionsMinimumOfferForm from '@/components/views/settings/offers/CollectionsMinimumOfferForm';
import MirrorNode from '@/services/MirrorNode';
import { NFTInfo } from '@/utils/entity/NFTInfo';
import { TokenInfo } from '@/utils/entity/TokenInfo';
import map from 'lodash/map';
import Loader from '@/components/shared/loader/Loader';

export default function Offers() {
  const { userWalletId } = useHederaWallets();
  const [collections, setCollections] = useState<{ nfts?: NFTInfo[]; info: TokenInfo; }[]>([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (userWalletId) {
      const loadCollections = async () => {
        const users = await MirrorNode.fetchUserCollectionsInfo(userWalletId, {
          onlyAllowedToMint: true,
        })

        setCollections(users)
        setLoading(false);
      }

      loadCollections()
    }
  }, [userWalletId, setCollections, setLoading])

  const initialValues = useMemo(() => ({
    settings_offers_collections: map(collections, collection => (
      {
        token_id: collection.info.token_id,
        minimum_offer: '',
        nft_sum: collection.nfts.length,
        collection_name: collection.info.name,
        collection_symbol: collection.info.symbol
      }
    )),
    wallet_address: userWalletId,
  }), [userWalletId, collections])

  const submitForm = useCallback((values, actions) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, []);

  return (
    <div className='settings__page settings__page--offers'>
      <h2>
        Offers <button className='btn--big'>View my offers</button>
      </h2>
      {isLoading ? (
        <div className='my-nft-collection__loader-wrapper'>
          <Loader />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={submitForm}
          component={CollectionsMinimumOfferForm}
        />
      )}
    </div>
  );
}
