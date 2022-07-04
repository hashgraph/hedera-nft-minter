import React from 'react';
import { FormikValues, useFormikContext } from 'formik'
import renderValue from '@/utils/helpers/renderValue';
import { Attribute } from '@utils/entity/NFT-Metadata';
import { ExistingCollectionExistingNFTWizardSteps } from '@components/views/minter-wizard/existing-collection-existing-nft/steps';
import placeholder from '@assets/images/placeholder.png';

type Props = {
  step: number,
}
export default function ExistingCollectionExistingNFTSideSummary({ step }: Props) {
  const { values } = useFormikContext<FormikValues>()

  return <>
    <img
      src={values?.image
        ? `https://ipfs.io/ipfs/${ values.image }`
        : placeholder
      }
      alt='Thumb'
    />
    <p className='summary__info__row'>
      Collection max supply:&nbsp;<span>{renderValue(values?.maxSupply)}</span>
    </p>
    {step >= ExistingCollectionExistingNFTWizardSteps.SelectEditionScreen && (
      <p className='summary__info__row'>
        NFTs to mint:&nbsp;<span>{renderValue(values?.qty)}</span>
      </p>
    )}
    <p className='summary__info__collection-name'>
      {renderValue(values?.name)}
    </p>
    <p className='summary__info__row'>
      Token symbol:&nbsp;<span>{renderValue(values?.symbol)}</span>
    </p>
    <p className='summary__info__row'>
      Edition name:&nbsp;<span>{renderValue(values?.edition_name)}</span>
    </p>
    {step >= ExistingCollectionExistingNFTWizardSteps.SelectEditionScreen && (
      <>
        <p className='summary__info__row'>
          Created by:&nbsp;<span>{renderValue(values?.creator)}</span>
        </p>
        <hr />
        <p className='summary__info__header'>
          Description:
        </p>
        <p className='summary__info__row'>
          <span>{renderValue(values?.description)}</span>
        </p>
        <hr />
        <p className='summary__info__header'>
          Attributes:
        </p>
        <div className='summary__info__multiple'>
          {values?.attributes.map(((property: Attribute) => (
            <p key={property.trait_type}>{property.trait_type}: <span>{property.value}</span></p>
          )))}
        </div>
      </>
    )}
  </>;
}
