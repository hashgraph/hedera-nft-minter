import React, { useCallback, useContext, useState } from 'react';
import { FormikValues, useFormikContext } from 'formik'
import { Attribute, Propertie } from '@utils/entity/NFT-Metadata';
import { TokenKeys } from '@components/shared/minter-wizard/minter-wizard-keys';
import { StepContext } from '@components/shared/minter-wizard/side-sumary';
import { NewCollectionNewNFTWizardSteps } from '@/components/views/minter-wizard/new-collection-new-nft/steps';
import Error from '@components/shared/form/Error'
import placeholder from '@assets/images/placeholder.png';

export default function NewNftNewCollectionSideSummary() {
  const [step, setStep] = useContext(StepContext)

  const { values, errors } = useFormikContext<FormikValues>()
  const [showAdvenced, setShowAdvenced] = useState(false)

  const backToOffChain = useCallback((name) =>
    setStep && !!errors[name] && setStep(NewCollectionNewNFTWizardSteps.OffChainScreen)
  , [setStep, errors])

  const renderValue = useCallback((value) =>
    value ? value : 'Not set'
  , [])

  return (
    <>
      <img
        src={
          values?.image ? URL.createObjectURL(values?.image) : placeholder
        }
        alt='Thumb'
      />
      <p className='sidesummary__info__row'>
        Collection max supply: <b>{values?.maxSupply}</b>
      </p>
      {step >= NewCollectionNewNFTWizardSteps.OffChainScreen && (
        <>
          <p className='sidesummary__info__collection-name'>
            {renderValue(values?.name)}
          </p>
          <Error className='sidesummary__error' onClick={() => backToOffChain('name')} name='name' />
          <p className='sidesummary__info__row'>
            Token symbol: {renderValue(values?.symbol)}
          </p>
          <Error className='sidesummary__error' onClick={() => backToOffChain('name')} name='symbol' />
          <p className='sidesummary__info__row'>
            Created by <i>{renderValue(values?.creator)}</i>
          </p>
          <Error className='sidesummary__error' onClick={() => backToOffChain('name')} name='creator' />
          <hr />
          <p className='sidesummary__info__header'>
            Description:
          </p>
          <p className='sidesummary__info__row'>
            {renderValue(values?.description)}
          </p>
          <div onClick={() => backToOffChain('description')}>
            <Error name='description' />
          </div>
        </>
      )}
      {step >= NewCollectionNewNFTWizardSteps.AdvencedScreen && (
        <>
          <hr />
          <p className='sidesummary__info__header'>
            Properties:
          </p>
          <div className='sidesummary__info__multiple'>
            {values?.properties.map(((property: Propertie) => (
              <p key={property.name}>{property.name}: {property.value}</p>
            )))}
          </div>
          <p className='sidesummary__info__header'>
            Attributes:
          </p>
          <div className='sidesummary__info__multiple'>
            {values?.attributes.map(((property: Attribute) => (
              <p key={property.trait_type}>{property.trait_type}: {property.value}</p>
            )))}
          </div>
          <hr />
          <p className='sidesummary__info__header'>
            Advenced settings: <button type='button' onClick={() => setShowAdvenced(prev => !prev)}>
              {showAdvenced ? 'Hide' : 'Show'}
            </button>
          </p>

          {showAdvenced && (
            <>
              {values?.fees.length > 0 && (
                <div className='sidesummary__info__multiple'>
                  <p className='sidesummary__info__subheader'>
                    Fees
                  </p>
                  {values?.fees.length > 0 && values?.fees.map(((fee: { type: string }) => (
                    <p key={fee.type}>
                      {fee.type[0].toUpperCase()}
                      {fee.type.slice(1, fee.type.length)}
                      {' '}Fee
                    </p>
                  )))}
                </div>
              )}
              <div className='sidesummary__info__multiple'>
                <p className='sidesummary__info__subheader'>
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
      )}
    </>
  );
}
