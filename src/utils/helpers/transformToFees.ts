import { FEE, Fees, FIXED_FEE_COLLECTING_TYPE } from '@utils/entity/Fees';
import { Hbar, CustomFixedFee, CustomFractionalFee, CustomRoyaltyFee } from '@hashgraph/sdk';
import _ from 'lodash';

type HederaFee = CustomFixedFee | CustomFractionalFee | CustomRoyaltyFee;

export default function transformToFees(fees: Fees[]): HederaFee[] {
  return fees.map(fee => {
    let fallbackFee = null;
    let fixedFee = null;
    switch (fee.type) {
      case FEE.FIXED:
        fixedFee = new CustomFixedFee({
          ..._.pick(fee,['amount', 'feeCollectorAccountId'])
        });
        if(fee.collectingFeeType === FIXED_FEE_COLLECTING_TYPE.TOKEN){
          fixedFee.setDenominatingTokenId(fee.denominatingTokenId)
        }
        return fixedFee;

      case FEE.FRACTIONAL:
        return new CustomFractionalFee({
          numerator: 1,
          denominator: fee.percent,
          ..._.pick(fee,['min', 'max', 'feeCollectorAccountId', 'assessmentMethod'])
        });

      case FEE.ROYALITY:
        if (fee.fallbackFee) {
          fallbackFee = new CustomFixedFee().setHbarAmount(new Hbar(fee.fallbackFee))
        }
        return new CustomRoyaltyFee({
          feeCollectorAccountId: fee.feeCollectorAccountId,
          numerator: 1,
          denominator: fee.percent,
          fallbackFee: fallbackFee !== null ? fallbackFee : undefined,
        })
    }
  });
}
