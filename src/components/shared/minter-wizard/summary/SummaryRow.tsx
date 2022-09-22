
import { useMemo } from 'react';
import renderValue from '@/utils/helpers/renderValue';
import classNames from 'classnames';

export type SummaryRowProps = {
  fieldValue: string,
  title: string,
  className?: string,
}

export default function SummaryRow({ fieldValue, title, className }: SummaryRowProps) {

  const summaryRowClassName = useMemo(() => (
    classNames('minter-wizard__summary__row', className)
  ), [className])

  return (
    <div className={summaryRowClassName}>
      <p>{renderValue(title)}</p>

      <span>{renderValue(fieldValue)}</span>
    </div>
  )
}
