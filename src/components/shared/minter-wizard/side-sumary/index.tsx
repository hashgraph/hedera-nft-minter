import React, { useCallback, useState } from 'react'
import { FormikValues, useFormikContext } from 'formik'
import useLayout from '@utils/hooks/useLayout';
import { MintTypes } from '@/utils/entity/MinterWizard';
import NewNftNewCollectionSideSummary from './new-nft-new-collection';
import './sides_summary.scss'
import Modal from '../../modal';

type SetStep = React.Dispatch<React.SetStateAction<number>>

type Props = {
  step: number,
  setStep: SetStep;
}

export default function SideSummary({ step, setStep }: Props) {
  const { values } = useFormikContext<FormikValues>()
  const { isMobile } = useLayout()
  const [expandSummary, setExpandSummary] = useState(false)

  const handleShowModal = useCallback(() =>
    isMobile && setExpandSummary(prev => !prev),
  [isMobile, setExpandSummary])

  const summaryContent = useCallback(() => {
    if (values && values.mint_type) {
      switch (values.mint_type) {
        case MintTypes.NewCollectionNewNFT:
          return <NewNftNewCollectionSideSummary step={step} setStep={setStep}/>
        case MintTypes.ExistingCollectionNewNFT:
          return <p>Existing coll new nft summary</p>
        case MintTypes.ExistingCollectionExistingNFT:
          return <p>Existing coll existing nft summary</p>
      }
    }
    return null
  }, [values, step, setStep])

  return (
    <>
      {expandSummary && (
        <Modal
          closeModal={() => setExpandSummary(false)}
          isModalShowed={expandSummary}
        >
          <div className='sidesummary__modal'>
            {summaryContent()}
          </div>
        </Modal>
      )}

      <aside className='sidesummary'>
        <h4>Your NFT is under construction</h4>
        {isMobile ? (
          <button
            type='button'
            onClick={handleShowModal}
          >
            Show data
          </button>
        ) : (
          summaryContent()
        )}
      </aside>
    </>
  )
}
