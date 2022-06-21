import React, { useCallback, useState } from 'react'
import { FormikValues, useFormikContext } from 'formik'
import useLayout from '@utils/hooks/useLayout';
import { MintTypes } from '@/utils/entity/MinterWizard';
import Modal from '@components/shared/modal';
import NewNftNewCollectionSideSummary from './NewNFTNewCollection';
import ExistingCollectionNewNFTSideSummary from './ExistingCollectionNewNFT';
import ExistingCollectionExistingNFTSideSummary from './ExistingCollectionExistingNFT';
import './sides_summary.scss'

type Props = {
  step: number,
}

export default function SideSummary({ step }: Props) {
  const { values } = useFormikContext<FormikValues>()
  const { isMobile } = useLayout()
  const [expandSummary, setExpandSummary] = useState(false)

  const handleShowModal = useCallback(() => (
    isMobile && setExpandSummary(prev => !prev)
  ), [isMobile, setExpandSummary])

  const summaryContent = useCallback(() => {
    if (values && values.mint_type) {
      switch (values.mint_type) {
        case MintTypes.NewCollectionNewNFT:
          return <NewNftNewCollectionSideSummary step={step} />
        case MintTypes.ExistingCollectionNewNFT:
          return <ExistingCollectionNewNFTSideSummary step={step} />
        case MintTypes.ExistingCollectionExistingNFT:
          return <ExistingCollectionExistingNFTSideSummary step={step} />
      }
    }
    return null
  }, [values, step])

  return (
    <>
      {expandSummary && (
        <Modal
          closeModal={() => setExpandSummary(false)}
          isModalShowed={expandSummary}
        >
          <div className='side_summary__modal'>
            {summaryContent()}
          </div>
        </Modal>
      )}

      <aside className='side_summary'>
        <div className='side_summary__wrapper'>
          <h4>Your NFT is being created.</h4>
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
        </div>
      </aside>
    </>
  )
}
