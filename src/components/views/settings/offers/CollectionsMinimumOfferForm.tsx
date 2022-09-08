import React from 'react'
import { Field, FieldArray, Form, useFormikContext, FormikValues } from 'formik'
import map from 'lodash/map'
import Tooltip from '@/components/shared/form/Tooltip'
import Avatar from '@/components/shared/avatar'
import placeholder from '@assets/images/placeholder.png';
import './collections-minimum-offer-form.scss'

export default function ProfileForm() {
  const { values } = useFormikContext<FormikValues>()

  return (
    <Form >
      <p className='flex'>Set a minimum offer for collections to ignore low offers.
        <Tooltip>
          You will not be notified on offers below your minimum amounts.
        </Tooltip>
      </p>
      <div className='collection-minimum-offer-form__header'>
        <span>Collection</span>
        <span>Minimum offer</span>
      </div>
      <FieldArray
        name='settings_offers_collections'
        render={() => (
          <div>
            {values.settings_offers_collections && values.settings_offers_collections.length > 0 && (
              map(values.settings_offers_collections, ((offer, index) => (
                <div key={`collection-minimum-offer-form__${ index }`} className='collection-minimum-offer-form__collection'>
                  <div className='collection-minimum-offer-form__collection__avatar'>
                    <Avatar url={placeholder} />
                  </div>
                  <div className='collection-minimum-offer-form__collection__info'>
                    <span>{offer.nft_sum} items</span>
                    <p><span>{offer.collection_symbol} |</span> {offer.collection_name}</p>
                    <span>Floor price: <strong>0 HBAR</strong></span>
                  </div>
                  <Field name={'settings_offers_collections.minimum_offer'} type='number' placeholder='0' />
                  <span className='collection-minimum-offer-form__collection__input-label'>$0 USD</span>
                </div>
            ))))}
            <div>
              <button className='btn--big' type='submit'>Submit</button>
            </div>
          </div>
        )}
      />
    </Form>
  )
}
