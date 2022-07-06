import React, { useContext } from 'react'
import { useFormikContext } from 'formik';
import useMinterWizardSummary from '@/utils/hooks/useMinterWizardSummary'
import { MinterWizardContext } from '@/components/shared/minter-wizard/MinterWizardForm'
import './summary.scss'

type Props = {
  goToCreator: () => void;
}

export default function MinterWizardSummary({ goToCreator }: Props) {
  const { creatorStepToBackFromSummary } = useContext(MinterWizardContext)
  const minterWizardSummary = useMinterWizardSummary(creatorStepToBackFromSummary)
  const { isSubmitting } = useFormikContext()

  return (
    <>
      <div className='minter-wizard__final-summary'>
        <div className='summary'>
          {minterWizardSummary}

          <div className='minter-wizard__creator__nav'>
            <div className='prev'>
              <button
                className='btn--big'
                type='button'
                onClick={goToCreator}
              >
                Go to last creator step
              </button>
            </div>
            <div className='next'>
              <button
                className='btn--big'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Finish in wallet...' : 'Mint'}
              </button>
            </div>
          </div>
        </div>

        <div className='summary__side-bar'>
          <h3>Here is an overview of the creation of your NFT</h3>
          <p>Remember, some of the steps are immutable.</p>
          <p>If everything looks fine, go ahead and mint your new NFT.</p>
        </div>
      </div>
    </>
  )
}
