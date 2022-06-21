import transformToFees from '@helpers/transformToFees';
import { FEE, Fees } from '@utils/entity/Fees';
import pick from 'lodash/pick';

const prepareFees = (customFees : Fees[]) => {
  const filteredFees = customFees
    .filter(fee => fee.type !== FEE.NONE)
    .map(fee => {
    switch(fee.type){
      case FEE.FIXED:
        return pick(fee,[
          'collectingFeeType',
          'hbarAmount',
          'amount',
          'denominatingTokenId',
          'feeCollectorAccountId',
          'type'
        ])

      case FEE.FRACTIONAL:
        return {
          numerator: fee.percent,
          denominator: 100,
          ...pick(fee,[
            'min',
            'max',
            'feeCollectorAccountId',
            'assessmentMethod',
            'type'
          ])
        }

      case FEE.ROYALITY:
          return {
            numerator: fee.percent,
            denominator: 100,
            ...pick(fee,[
              'feeCollectorAccountId',
              'fallbackFee',
              'type'
            ])
          }

      case FEE.NONE:
        return {
          type: FEE.NONE,
          feeCollectorAccountId: ''
        }
    }
  })

  return transformToFees(filteredFees);
}


export default prepareFees
