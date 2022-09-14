import React from 'react';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import Tooltip from '@/components/shared/form/Tooltip';

type FixedFeeProps = {
  index: number;
}

export default function FixedFee({index} : FixedFeeProps) {
  return (
    <>
      <Tooltip title='Fixed fee' showLabel>
        A fixed number of units (hbar or token) to uses as a
        fee during a CryptoTransfer that transfers units of
        the token to which this fixed fee is attached. <br />
        <a
          href='https://docs.hedera.com/guides/docs/hedera-api/token-service/customfees/fixedfee'
          target='_blank'
        >
            Link to docs
        </a>
      </Tooltip>
      <div className='form__row__fees__fee'>
        <FieldWrapper
          name={`fees.${ index }.amount`}
          type='number'
          placeholder='e.g. 15'
          label='# amount ℏ'
        />
      </div>
    </>
  )
}
