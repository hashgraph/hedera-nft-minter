import React from 'react';
import { FormikValues, useFormikContext } from 'formik'
import { Attribute, Propertie } from '@utils/entity/NFT-Metadata';
import renderValue from '@/utils/helpers/renderValue';
import { ExistingCollectionNewNFTWizardSteps } from '@components/views/minter-wizard/existing-collection-new-nft/steps';
import placeholder from '@assets/images/placeholder.png';

type Props = {
  step: number,
}

export default function ExistingCollectionNewNFTSideSummary({ step }: Props) {
  const { values } = useFormikContext<FormikValues>()

  return <>
    <img
      src={values?.image
        ? URL.createObjectURL(values?.image)
        : placeholder
      }
      alt='Thumb'
    />
    {values?.name && (
      <>
        <p className='summary__info__row'>
          Collection max supply:&nbsp;<span>{renderValue(values?.maxSupply)}</span>
        </p>
        <p className='summary__info__row'>
          NFT copies to mint:&nbsp;<span>{renderValue(values?.qty)}</span>
        </p>
        <hr />
        <p className='summary__info__collection-name--header'>Collection name:</p>
        <p className='summary__info__collection-name'>
          {renderValue(values?.name)}
        </p>
        <p className='summary__info__row'>
          Collection symbol:&nbsp;<span>{renderValue(values?.symbol)}</span>
        </p>
      </>
    )}

    {step >= ExistingCollectionNewNFTWizardSteps.OffChainScreen && (
      <>
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
    {step >= ExistingCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen && (
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
      </>
    )}
  </>;
}
