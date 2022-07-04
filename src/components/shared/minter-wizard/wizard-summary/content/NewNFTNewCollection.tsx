import React from 'react';
import { FormikValues, useFormikContext } from 'formik'
import renderValue from '@/utils/helpers/renderValue';
import { Attribute, Propertie } from '@utils/entity/NFT-Metadata';
import { TokenKeys } from '@/components/shared/minter-wizard/KeysTable';
import { NewCollectionNewNFTWizardSteps } from '@/components/views/minter-wizard/new-collection-new-nft/steps';
import placeholder from '@assets/images/placeholder.png';

type Props = {
  step: number,
}

export default function NewNftNewCollectionSideSummary({ step }: Props) {
  const { values } = useFormikContext<FormikValues>()

  return (
    <>
      <img
        src={values?.image
          ? URL.createObjectURL(values?.image)
          : placeholder
        }
        alt='Thumb'
      />
      <p className='summary__info__row'>
        Collection max supply:&nbsp;<span>{renderValue(values?.maxSupply)}</span>
      </p>
      <p className='summary__info__row'>
        NFTs to mint:&nbsp;<span>{renderValue(values?.qty)}</span>
      </p>
      {step >= NewCollectionNewNFTWizardSteps.OffChainBasisScreen && (
        <>
          <hr />
          <p className='summary__info__collection-name--header'>Collection name:</p>
          <p className='summary__info__collection-name'>
            {renderValue(values?.name)}
          </p>
          <p className='summary__info__row'>
            Collection symbol:&nbsp;<span>{renderValue(values?.symbol)}</span>
          </p>
          <p className='summary__info__row'>
            NFT name:&nbsp;<span>{renderValue(values?.edition_name)}</span>
          </p>
          <p className='summary__info__row'>
            NFT created by:&nbsp;<span>{renderValue(values?.creator)}</span>
          </p>
          <p className='summary__info__row'>
            Creator DID:&nbsp;<span>{renderValue(values?.creatorDID)}</span>
          </p>
          <hr />
          <p className='summary__info__header'>
            NFT description:
          </p>
          <p className='summary__info__row summary__description'>
            <span>{renderValue(values?.description)}</span>
          </p>
        </>
      )}
      {step >= NewCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen && (
        <>
          <hr />
          <p className='summary__info__header'>
            NFT attributes:
          </p>
          {values?.attributes
            .filter((attribute: Attribute) => (attribute.trait_type || attribute.value))
            .length > 0 ? (
              <>
                <div className='summary__info__multiple'>
                  {values?.attributes.map(((property: Attribute) => (
                    <p key={property.trait_type}>
                      {renderValue(property.trait_type)}: <span>{renderValue(property.value)}</span>
                    </p>
                  )))}
                </div>
              </>
            ) : (
              <div className='summary__info__row--empty'>(empty)</div>
            )}
            <p className='summary__info__header'>
              General properties:
            </p>
            {values?.properties
              .filter((property: Propertie) => (property.label || property.value))
              .length > 0 ? (
                <>
                  <div className='summary__info__multiple'>
                    {values?.properties.map(((property: Propertie) => (property.label && property.value) && (
                      <p key={property.label}>
                        {renderValue(property.label)}: <span>{renderValue(property.value)}</span>
                      </p>
                    )))}
                  </div>
                </>
              ) : (
                <div className='summary__info__row--empty'>(empty)</div>
              )}

        </>)}
      {step >= NewCollectionNewNFTWizardSteps.AdvancedFeesScreen && (
        <>
          <hr />
          <p className='summary__info__subheader'>
            Transfer fees
          </p>
          {values?.fees.length > 0 ? (
            <>
              <div className='summary__info__multiple'>

                {values?.fees.length > 0 && values?.fees.map(((fee: { type: string }) => (
                  <p key={fee.type}>
                    {fee?.type[0]?.toUpperCase() ?? 'Empty'}
                    {fee?.type?.slice(1, fee.type.length)}
                    {' '}Fee
                  </p>
                )))}
              </div>
            </>
          ) : (
            <div className='summary__info__row--empty'>(empty)</div>
          )}
        </>
      )}
      {step >= NewCollectionNewNFTWizardSteps.AdvancedKeysScreen && (
        <>
          <hr />
          <p className='summary__info__subheader'>
              Keys
            </p>
          <div className='summary__info__multiple'>
            {values?.keys.length > 0 && values?.keys.map(((valuesKey: { type: string }) => (
              <p key={valuesKey.type}>
                {TokenKeys.find(key => key.value === valuesKey.type)?.title}
              </p>
            )))}
          </div>
        </>
      )}
    </>
  );
}
