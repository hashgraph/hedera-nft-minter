import transformToFees from '@helpers/transformToFees';
import { FEE, Fees } from '@utils/entity/Fees';
import pick from 'lodash/pick';

const prepareFees = (customFees: Fees[], accountId: string) => {
  const filteredFees = customFees
    .map(fee => {
      switch (fee.type) {
        case FEE.FIXED:
          return {
            ...pick(fee, [
              'amount',
              'type',
            ]),
            accountId,
          }

        case FEE.ROYALTY:
          return {
            numerator: fee.percent,
            denominator: 100,
            ...pick(fee, [
              'feeCollectorAccountId',
              'fallbackFee',
              'type'
            ])
          }
      }
    })

  return transformToFees(filteredFees);
}


export default prepareFees
