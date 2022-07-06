
import renderValue from '@/utils/helpers/renderValue';

export enum SummaryRowStylingTypes {
  withHeader = 'with-header',
  cursive = 'cursive'
}

export type SummaryRowProps = {
  stylingType?: SummaryRowStylingTypes,
  fieldValue: string,
  title: string,
}

export default function SummaryRow({ stylingType, fieldValue, title }: SummaryRowProps) {

  if (stylingType === SummaryRowStylingTypes.withHeader) {
    return (
      <>
        <p className='summary__info__collection-name--header'>{title}</p>
        <p className='summary__info__collection-name'>
          {renderValue(fieldValue)}
        </p>
      </>
    )
  }

  if (stylingType === SummaryRowStylingTypes.cursive) {
    return (
      <>
        <hr />
        <p className='summary__info__header'>
          {title}
        </p>
        <p className='summary__info__row summary__description'>
          <span>{renderValue(fieldValue)}</span>
        </p>
      </>
    )
  }

  return (
    <p className='summary__info__row'>
      {title}&nbsp;<span>{renderValue(fieldValue)}</span>
    </p>
  )
}
