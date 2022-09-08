import React from 'react'
import { FormikValues, useFormikContext } from 'formik';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';

import SummaryContent from '@/components/shared/minter-wizard/summary/Content'
import SummaryNavigation from '@/components/shared/minter-wizard/summary/Navigation'
import SummaryProcessing from '@/components/shared/minter-wizard/summary/Processing';


type MinterWizardSummaryProps = {
  goToCreator: () => void;
}


export default function MinterWizardSummary(props: MinterWizardSummaryProps) {
  const { isSubmitting } = useFormikContext<FormikValues>()

  return (
    <>
      <div className='minter-wizard__summary minter-wizard__animation-container'>
        <SwitchTransition>
          <CSSTransition
            key={isSubmitting ? 'submitting' : 'waiting'}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            classNames='fade'
          >
            {isSubmitting ? (
              <SummaryProcessing />
            ) : (
              <>
                <SummaryContent />
                <SummaryNavigation {...props}/>
              </>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  )
}
