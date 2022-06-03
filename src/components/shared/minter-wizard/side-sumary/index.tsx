import React from 'react'
import { useFormikContext } from 'formik'
import './sides_summary.scss'

export default function SideSummary() {
  const {values, errors, touched} = useFormikContext()

  return (
    <aside className='sidesummary'>
      Your NFT is under construction
      <pre>
        Values
        {JSON.stringify(values, null, 2)}
      </pre>
      <pre>
        Errors
        {JSON.stringify(errors, null, 2)}
      </pre>
      <pre>
        Touched
        {JSON.stringify(touched, null, 2)}
      </pre>
    </aside>
  )
}
