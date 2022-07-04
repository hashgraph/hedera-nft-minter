import React from 'react';
import { FormikValues, useFormikContext } from 'formik'
import { Attribute } from '@utils/entity/NFT-Metadata';
import { ExistingCollectionExistingNFTWizardSteps } from '@components/views/minter-wizard/existing-collection-existing-nft/steps';
import placeholder from '@assets/images/placeholder.png';
import SummaryRow from '@/components/shared/minter-wizard/summary/SummaryRow';
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows';

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
    <SummaryRow
      title='Collection max supply:'
      fieldValue={values?.maxSupply}
    />
    {step >= ExistingCollectionExistingNFTWizardSteps.SelectEditionScreen && (
      <SummaryRow
        title='NFTs to mint:'
        fieldValue={values?.qty}
      />
    )}
    <SummaryRows
      data={[
        {
          title: 'Collection name:',
          fieldValue: values?.name,
          type: 'with-header'
        },
        {
          title: 'Collection symbol:',
          fieldValue: values?.symbol
        },
        {
          title: 'Edition name:',
          fieldValue: values?.edition_name
        },
      ]}
    />

    {step >= ExistingCollectionExistingNFTWizardSteps.SelectEditionScreen && (
      <>
        <SummaryRows
          data={[
            {
              title: 'NFT created by:',
              fieldValue: values?.creator
            },
            {
              title: 'Creator DID:',
              fieldValue: values?.creatorDID
            },
            {
              title: 'NFT description:',
              fieldValue: values?.description,
              type: 'cursive'
            },
          ]}
        />

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
