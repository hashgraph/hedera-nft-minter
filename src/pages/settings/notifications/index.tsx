import NotificationsForm from '@/components/views/settings/notifications/NotificationsForm';
import useHederaWallets from '@/utils/hooks/useHederaWallets';
import { Formik } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

export default function Notifications() {
  const { userWalletId } = useHederaWallets()

  const initialValues = useMemo(() => ({
    item_sold: false,
    bid_activity: true,
    price_change: true,
    auction_expiration: false,
    outbid: true,
    owned_item_updates: true,
    successful_purchase: true,
    newsletter: false,
    minimum_bid_threshold: 0.005,
    wallet_address: userWalletId,
  }), [userWalletId])

  const submitForm = useCallback((_, actions) => {
    toast.success('Saved!')
    actions.setSubmitting(false);
  }, []);

  return (
    <div className='settings__page settings__page--notifications'>
      <h2>
        Notifications settings
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        component={NotificationsForm}
      />

    </div>
  )
}
