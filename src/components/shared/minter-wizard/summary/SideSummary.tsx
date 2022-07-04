import React from 'react'
import useMinterWizardSummary from '@/utils/hooks/useMinterWizardSummary';

type Props = {
  step: number,
}

export default function SideSummary({ step }: Props) {
  const minterWizardSummary = useMinterWizardSummary(step)

  return (
    <aside className='summary summary--side'>
      <div className='summary__wrapper'>
        <h4>NFT Preview.</h4>

        {minterWizardSummary}
      </div>
    </aside>
  )
}
