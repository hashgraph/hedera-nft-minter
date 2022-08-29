import React from 'react';
import { FormikValues, useFormikContext } from 'formik'
import { TokenSupplyType } from '@/utils/entity/TokenInfo';
import { ExistingCollectionNewNFTWizardSteps } from '@components/views/minter-wizard/existing-collection-new-nft/steps';
import { SummaryRowStylingTypes } from '@/components/shared/minter-wizard/summary/SummaryRow';
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows';
import SummaryProperties from '@/components/shared/minter-wizard/summary/SummaryProperties';
import SummaryAttributes from '@/components/shared/minter-wizard/summary/SummaryAttributes';
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
        <SummaryRows
          data={[
            {
              title: 'Collection max supply:',
              fieldValue: values.supplyType === TokenSupplyType.INFINITE
                ? TokenSupplyType.INFINITE
                : values?.maxSupply
            },
            {
              title: 'NFT copies to mint:',
              fieldValue: values?.qty
            },
            {
              title: 'Collection name:',
              fieldValue: values?.name,
              stylingType: SummaryRowStylingTypes.withHeader
            },
            {
              title: 'Collection symbol:',
              fieldValue: values?.symbol
            },
          ]}
        />
      </>
    )}

    {step >= ExistingCollectionNewNFTWizardSteps.OffChainScreen && (
      <>
        <SummaryRows
          data={[
            {
              title: 'NFT name:',
              fieldValue: values?.edition_name
            },
            {
              title: 'NFT created by:',
              fieldValue: values?.creator
            },
            {
              title: 'NFT description:',
              fieldValue: values?.description,
              stylingType: SummaryRowStylingTypes.cursive
            },
          ]}
        />
      </>
    )}
    {step >= ExistingCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen && (
      <>
        <hr />
        <SummaryAttributes />
        <SummaryProperties />
      </>
    )}
  </>;
}
