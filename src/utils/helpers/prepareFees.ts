import transformToFees from '@helpers/transformToFees';
import { FEE, Fees } from '@utils/entity/Fees';
import _ from 'lodash';

const prepareFees = (customFees : Fees[]) => {
  const filteredFees = customFees.map(fee=>{
    switch(fee.type){
      case FEE.FIXED:
        return _.pick(fee,[
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
          ..._.pick(fee,[
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
            ..._.pick(fee,[
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