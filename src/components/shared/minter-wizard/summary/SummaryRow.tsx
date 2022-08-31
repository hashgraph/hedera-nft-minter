
import renderValue from '@/utils/helpers/renderValue';

export type SummaryRowProps = {
  fieldValue: string,
  title: string,
}

export default function SummaryRow({ fieldValue, title }: SummaryRowProps) {

  return (
    <p className='minter-wizard__summary__info-row'>
      {title}&nbsp;<span>{renderValue(fieldValue)}</span>
    </p>
  )
}
