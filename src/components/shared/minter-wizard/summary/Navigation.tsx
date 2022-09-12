import React, { useContext } from 'react'
import { FormikValues, useFormikContext } from 'formik';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';

import { MinterWizardContext } from '@/components/views/minter-wizard'

type SummaryNavigationProps = {
  goToCreator: () => void;
}

export default function Navigation({ goToCreator } : SummaryNavigationProps) {
  const { isSubmitting } = useFormikContext<FormikValues>()
  const {
    setShowWarning,
    showWarning,
  } = useContext(MinterWizardContext)

  return (
    <div className='minter-wizard__creator__nav--summary'>
      <div className='prev'>
        <button
          className='btn--arrow-left'
          type='button'
          onClick={showWarning ? () => setShowWarning(false) : goToCreator }
        >
          Back
        </button>
      </div>
      <div className='next'>
        <SwitchTransition>
          <CSSTransition
            key={showWarning ? 'warning' : 'submit'}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            classNames='fade'
          >
            {!showWarning ? (
              <button
                className='btn--arrow'
                type='button'
                onClick={() => setShowWarning(true)}
                disabled={isSubmitting}
              >
                Mint it!
              </button>
            ) : (
              <button
                className='btn--arrow-green'
                type='submit'
                disabled={isSubmitting}
              >
                YES! Mint it!
              </button>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}
