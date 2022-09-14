import React, { useEffect, useMemo } from 'react';
import { useField } from 'formik';
import useHederaWallets from '@/utils/hooks/useHederaWallets';
import FieldWrapper from '@/components/shared/form/FieldWrapper';
import Tooltip from '@/components/shared/form/Tooltip';

type RoyaltyFeeProps = {
  index: number;
}

export default function RoyaltyFee({index} : RoyaltyFeeProps) {
  const [,,{ setValue }] = useField(`fees.${ index }.feeCollectorAccountId`)
  const { userWalletId } = useHederaWallets()

  const collectingAccountId = useMemo(() => (
    userWalletId
      ? userWalletId?.toString()
      : 'Connect your wallet!'
  ), [userWalletId])

  useEffect(() => {
    setValue(userWalletId ? userWalletId : '')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userWalletId])

  return (
    <>
      <Tooltip title='Royalty fee' showLabel>
        A fee to assess during a CryptoTransfer that changes ownership of an NFT.
        Defines the fraction of the fungible value exchanged for an NFT that the
        ledger should collect as a royalty. ("Fungible value" includes both ℏ and units of
        fungible HTS tokens.) When the NFT sender does not receive any fungible value, the
        ledger will assess the fallback fee, if present, to the new NFT owner. <br />
        <a
          href='https://docs.hedera.com/guides/docs/hedera-api/token-service/customfees/royaltyfee'
          target='_blank'
        >
          Link to docs
        </a>
      </Tooltip>
      <div className='form__row__fees__fee'>
        <div>
          <label htmlFor='null'>
            Fee collector account ID:
          </label>
          <p className='input'>
            {collectingAccountId}
          </p>
        </div>
        <div>
          <FieldWrapper
            name={`fees.${ index }.fallbackFee`}
            type='number'
            label='Fallback fee (ℏ)'
            placeholder='e.g. 5'
          />
        </div>
        <div>
          <FieldWrapper
            name={`fees.${ index }.percent`}
            type='number'
            label='Royalty %'
            placeholder='e.g. 10'
          />
        </div>
      </div>
    </>
  );
}