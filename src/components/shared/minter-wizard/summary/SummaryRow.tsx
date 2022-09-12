
import renderValue from '@/utils/helpers/renderValue';

export type SummaryRowProps = {
  fieldValue: string,
  title: string,
}

export default function SummaryRow({ fieldValue, title }: SummaryRowProps) {

  return (
    <p className='minter-wizard__summary__row'>
      {renderValue(title)}&nbsp;<span>{renderValue(fieldValue)}</span>
    </p>
  )
}
