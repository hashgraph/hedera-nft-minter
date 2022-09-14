import React from 'react'
import { useField } from 'formik';
import find from 'lodash/find';

import firstLetterUppercase from '@/utils/helpers/firstLetterUppercase';
import { Fees } from '@utils/entity/Fees';
import { TOKEN_KEY } from '@utils/entity/TokenKeys'

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
  const [field] = useField<Fees[] | TOKEN_KEY[]>(name);

  return (
    <>
      {field.value.length > 0 && (
        <>
          <div className='minter-wizard__summary__column'>
            {field.value?.length > 0 && field.value.map(((element, i) => {
              switch (name) {
                case AdvancedTypes.fees:
                  element = element as Fees
                  return (
                    <React.Fragment key={element.type ?? `summary-fee-without-type-${ i }`}>
                      {element.type && element?.type?.length > 0 ? (
                        <p className='minter-wizard__summary__row'>
                          {element.type && firstLetterUppercase(element.type) + ' fee'}
                          <span>
                            {element.type === 'fixed' && `Amount: ${ element.amount }`}
                            {element.type === 'royalty' && `Amount: ${ element.fallbackFee ?? '(empty)' } | %: ${ element.percent }`}
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
                  element = element as TOKEN_KEY
                  return (
                    <p
                      className='minter-wizard__summary__row'
                      key={element ?? `summary-key-without-type-${ i }`}
                    >
                      {find(TokenKeys, key => key.value === element)?.title} key
                      <span>
                        <img src={checkmarkIcon} width={16} height={16} alt='checked' />
                      </span>
                    </p>
                  )
              }
            }))}
          </div>
        </>
      )}
    </>
  )
}
