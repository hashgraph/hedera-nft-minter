import React, { useMemo } from 'react'
import { useField } from 'formik';
import { Fees } from '@utils/entity/Fees';
import { TokenKeys as TokenKeysType } from '@utils/entity/TokenKeys'
import { TokenKeys } from '@/components/shared/minter-wizard/KeysTable';

export enum AdvancedTypes {
  fees = 'fees',
  keys = 'keys',
}

type SummaryAdvancedProps = {
  name: AdvancedTypes
}

export default function SummaryAdvanced({ name }: SummaryAdvancedProps) {
  const [field] = useField<Fees[] | TokenKeysType>(name);

  const subHeader = useMemo(() => {
    switch (name) {
      case AdvancedTypes.fees:
        return 'Transfer fees'

      case AdvancedTypes.keys:
        return 'Keys'
    }
  }, [name])

  return (
    <>
      <p className='summary__info__subheader'>
        {subHeader}
      </p>
      {field.value.length > 0 ? (
        <>
          <div className='summary__info__multiple'>
            {field.value?.length > 0 && field.value.map(((element, i) => {
              switch (name) {
                case AdvancedTypes.fees:
                  return (
                    <p key={element.type ?? `summary-fee-without-type-${ i }`}>
                      {element.type && element?.type?.length > 0 ? (
                        <>
                          {element?.type[0]?.toUpperCase()}
                          {element?.type?.slice(1, element.type.length)}
                        </>
                      ) : (
                        <>
                          Empty
                        </>
                      )}
                      {' '}Fee
                    </p>
                  )

                case AdvancedTypes.keys:
                  return (
                    <>
                      <p key={element.type ?? `summary-key-without-type-${ i }`}>
                        {TokenKeys.find(key => key.value === element.type)?.title}
                      </p>
                    </>
                  )
              }
            }))}
          </div>
        </>
      ) : (
        <div className='summary__info__row--empty'>(empty)</div>
      )}
    </>
  )
}
