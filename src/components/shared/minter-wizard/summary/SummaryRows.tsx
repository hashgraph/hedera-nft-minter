
import map from 'lodash/map';
import SummaryRow, { SummaryRowProps } from './SummaryRow';

type SummaryRowsProps = {
  data: SummaryRowProps[]
}

export default function SummaryRows({data} : SummaryRowsProps) {
  return (
    <>
      {map(data, props => <SummaryRow {...props} />)}
    </>
  )
}
