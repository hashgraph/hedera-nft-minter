import React from 'react';
import { FormikValues, useFormikContext } from 'formik'
import { NewCollectionNewNFTWizardSteps } from '@/components/views/minter-wizard/new-collection-new-nft/steps';
import { SummaryRowStylingTypes } from '@/components/shared/minter-wizard/summary/SummaryRow';
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows';
import SummaryProperties from '@/components/shared/minter-wizard/summary/SummaryProperties';
import SummaryAttributes from '@/components/shared/minter-wizard/summary/SummaryAttributes';
import placeholder from '@assets/images/placeholder.png';
import SummaryAdvanced, { AdvancedTypes } from '../SummaryAdvanced';

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
      <SummaryRows
        data={[
          {
            title: 'Collection max supply:',
            fieldValue: values?.maxSupply
          },
          {
            title: 'NFT to mint:',
            fieldValue: values?.qty
          },
        ]}
      />
      {step >= NewCollectionNewNFTWizardSteps.OffChainBasisScreen && (
        <>
          <hr />
          <SummaryRows
            data={[
              {
                title: 'Collection name:',
                fieldValue: values?.name,
                stylingType: SummaryRowStylingTypes.withHeader
              },
              {
                title: 'Collection symbol:',
                fieldValue: values?.symbol
              },
              {
                title: 'NFT name:',
                fieldValue: values?.edition_name
              },
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
                stylingType: SummaryRowStylingTypes.cursive
              },
            ]}
          />
        </>
      )}
      {step >= NewCollectionNewNFTWizardSteps.OffChainPropertiesAndAttributesScreen && (
        <>
          <hr />
          <SummaryAttributes />
          <SummaryProperties />
        </>
      )}
      {step >= NewCollectionNewNFTWizardSteps.AdvancedFeesScreen && (
        <>
          <hr />
          <SummaryAdvanced name={AdvancedTypes.fees} />
        </>
      )}
      {step >= NewCollectionNewNFTWizardSteps.AdvancedKeysScreen && (
        <>
          <hr />
          <SummaryAdvanced name={AdvancedTypes.keys} />
        </>
      )}
    </>
  );
}
