import React from 'react';
import { FormikValues, useFormikContext } from 'formik'
import renderValue from '@/utils/helpers/renderValue';
import { Attribute, Propertie } from '@utils/entity/NFT-Metadata';
import { TokenKeys } from '@/components/shared/minter-wizard/Keys';
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
      <p className='side_summary__info__row'>
        Collection max supply:&nbsp;<span>{renderValue(values?.maxSupply)}</span>
      </p>
      <p className='side_summary__info__row'>
        Tokens to mint:&nbsp;<span>{renderValue(values?.qty)}</span>
      </p>
      {step >= NewCollectionNewNFTWizardSteps.OffChainBasisScreen && (
        <>
          <p className='side_summary__info__collection-name'>
            {renderValue(values?.name)}
          </p>
          <p className='side_summary__info__row'>
            Token symbol:&nbsp;<span>{renderValue(values?.symbol)}</span>
          </p>
          <p className='side_summary__info__row'>
            Created by:&nbsp;<span>{renderValue(values?.creator)}</span>
          </p>
          <hr />
          <p className='side_summary__info__header'>
            Description:
          </p>
          <p className='side_summary__info__row side_summary__description'>
            <span>{renderValue(values?.description)}</span>
          </p>
        </>
      )}
      {step >= NewCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen && (
        <>
          {values?.properties
            .filter((property: Propertie) => (property.name || property.value))
            .length > 0 && (
              <>
                <hr />
                <p className='side_summary__info__header'>
                  Properties:
                </p>
                <div className='side_summary__info__multiple'>
                  {values?.properties.map(((property: Propertie) => (property.name && property.value) && (
                    <p key={property.name}>
                      {renderValue(property.name)}: <span>{renderValue(property.value)}</span>
                    </p>
                  )))}
                </div>
              </>)}
          {values?.attributes
            .filter((attribute: Attribute) => (attribute.trait_type || attribute.value))
            .length > 0 && (
              <>
                <p className='side_summary__info__header'>
                  Attributes:
                </p>
                <div className='side_summary__info__multiple'>
                  {values?.attributes.map(((property: Attribute) => (
                    <p key={property.trait_type}>
                      {renderValue(property.trait_type)}: <span>{renderValue(property.value)}</span>
                    </p>
                  )))}
                </div>
              </>
            )}
        </>)}
      {step >= NewCollectionNewNFTWizardSteps.AdvancedScreen && (
        <>
          <hr />
          {values?.fees.length > 0 && (
            <div className='side_summary__info__multiple'>
              <p className='side_summary__info__subheader'>
                Fees
              </p>
              {values?.fees.length > 0 && values?.fees.map(((fee: { type: string }) => (
                <p key={fee.type}>
                  {fee?.type[0]?.toUpperCase() ?? 'Empty'}
                  {fee?.type?.slice(1, fee.type.length)}
                  {' '}Fee
                </p>
              )))}
            </div>
          )}
          <div className='side_summary__info__multiple'>
            <p className='side_summary__info__subheader'>
              Keys
            </p>
            {values?.keys.length && values?.keys.map(((valuesKey: { type: string }) => (
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
