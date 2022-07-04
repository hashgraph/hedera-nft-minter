
import renderValue from '@/utils/helpers/renderValue';

export type SummaryRowProps = {
  type?: 'with-header' | 'cursive',
  fieldValue: string,
  title: string,
}

export default function SummaryRow({ type, fieldValue, title }: SummaryRowProps) {

  if (type === 'with-header') {
    return (
      <>
        <p className='summary__info__collection-name--header'>{title}</p>
        <p className='summary__info__collection-name'>
          {renderValue(fieldValue)}
        </p>
      </>
    )
  }

  if (type === 'cursive') {
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
