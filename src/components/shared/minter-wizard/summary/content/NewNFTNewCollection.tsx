import React from 'react';
import { FormikValues, useFormikContext } from 'formik'
import { TokenKeys } from '@/components/shared/minter-wizard/KeysTable';
import { NewCollectionNewNFTWizardSteps } from '@/components/views/minter-wizard/new-collection-new-nft/steps';
import SummaryRows from '@/components/shared/minter-wizard/summary/SummaryRows';
import SummaryProperties from '@/components/shared/minter-wizard/summary/SummaryProperties';
import SummaryAttributes from '@/components/shared/minter-wizard/summary/SummaryAttributes';
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
                type: 'with-header'
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
                type: 'cursive'
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
