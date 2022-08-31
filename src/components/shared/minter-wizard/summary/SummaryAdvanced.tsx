import React, { useMemo } from 'react'
import { useField } from 'formik';
import { Fees } from '@utils/entity/Fees';
import { TokenKeys as TokenKeysType } from '@utils/entity/TokenKeys'
import { TokenKeys } from '@/components/shared/minter-wizard/KeysTable';
import checkmarkIcon from '@/assets/images/icons/checkmark.svg'

export enum AdvancedTypes {
  fees = 'fees',
  keys = 'keys',
}

type SummaryAdvancedProps = {
  name: AdvancedTypes
}

export default function SummaryAdvanced({ name }: SummaryAdvancedProps) {
  const [field] = useField<Fees[] | TokenKeysType>(name);

  return (
    <>
      {field.value.length > 0 && (
        <>
          <div className='summary__info__multiple'>
            {field.value?.length > 0 && field.value.map(((element, i) => {
              switch (name) {
                case AdvancedTypes.fees:
                  return (
                    <React.Fragment key={element.type ?? `summary-fee-without-type-${ i }`}>
                      {element.type && element?.type?.length > 0 ? (
                        <p className='minter-wizard__summary__info-row'>
                          {element?.type[0]?.toUpperCase() + element?.type?.slice(1, element.type.length) + ' fee'}
                          <span>
                            {element.type === 'fixed' && `Amount: ${ element.amount }`}
                            {element.type === 'royalty' && `Amount: ${ element.fallbackFee } | %: ${ element.percent }`}
                          </span>
                        </p>
                      ) : (
                        <>
                          Empty fee
                        </>
                      )}
                    </React.Fragment>
                  )

                case AdvancedTypes.keys:
                  return (
                    // <>
                      <p className='minter-wizard__summary__info-row' key={element.type ?? `summary-key-without-type-${ i }`}>
                        {TokenKeys.find(key => key.value === element)?.title} key
                        <span>
                          <img src={checkmarkIcon} width={16} height={16} alt='checked' />
                        </span>
                      </p>
                    // </>
                  )
              }
            }))}
          </div>
        </>
      )}
    </>
  )
}
