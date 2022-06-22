import React from 'react'
import { useFormikContext } from 'formik';
import CheckboxFieldGroup from '@/components/shared/form/CheckboxFieldGroup';
import useHederaWallets from '@/utils/hooks/useHederaWallets';
import IconFieldWrapper from '@/components/shared/form/IconFieldWrapper';
import HBarIcon from '@assets/images/hbar.png'

export default function NotificationsForm() {
  const { submitForm } = useFormikContext()
  const { userWalletId } = useHederaWallets()

  return (
    <>
      <div className='settings__page__title'>
        <p>Select which notifications you would like to receive for <b>{userWalletId}</b> </p>
      </div>
      <CheckboxFieldGroup
        data={[
          {
            title: 'Item Sold',
            description: 'When someone purchased one of your items',
            name: 'item_sold',
          },
          {
            title: 'Bid Activity',
            description: 'When someone bids on one of your items',
            name: 'bid_activity',
          },
          {
            title: 'Price Change',
            description: 'When an item you made an offer on changes in price',
            name: 'price_change',
          },
          {
            title: 'Auction Expiration',
            description: 'When a timed auction you created ends',
            name: 'auction_expiration',
          },
          {
            title: 'Outbid',
            description: 'When an offer you placed is exceeded by another user',
            name: 'outbid',
          },
          {
            title: 'Owned Item Updates',
            description: 'When a significant update occurs for one of the items you have purchased on HederaMarketplace',
            name: 'owned_item_updates',
          },
          {
            title: 'Successful Purchase',
            description: 'When you successfully buy an item',
            name: 'successful_purchase',
          },
          {
            title: 'HederaMarketplace Newsletter',
            description: 'Occasional updates from the HederaMarketplace team',
            name: 'newsletter',
          },
        ]}
        onEachFieldValueChange={() => submitForm()}
      />
      <div className='settings__page__title'>
        <label htmlFor='null'>Minimum Bid Threshold</label>
        <p>Receive notifications only when you receive offers with a value greater than or equal to this amount of HBAR's.</p>
      </div>
      <IconFieldWrapper
        icon={(
          <>
            <img src={HBarIcon} alt='hbar_icon' />
            <div>
              HBAR
              <span>Hedera</span>
            </div>
          </>
        )}
        name='minimum_bid_threshold'
        type='number'
      />
    </>
  )
}
