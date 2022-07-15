import { FEE, Fees, FIXED_FEE_COLLECTING_TYPE } from '@utils/entity/Fees';
import { Hbar, CustomFixedFee, CustomFractionalFee, CustomRoyaltyFee } from '@hashgraph/sdk';

type HederaFee = CustomFixedFee | CustomFractionalFee | CustomRoyaltyFee;

export default function transformToFees(fees: Fees[]): HederaFee[] {
  return fees.map(fee => {
    let fallbackFee = null;
    switch (fee.type) {
      case FEE.FIXED: {
        const fixedFee = new CustomFixedFee(fee);

        if(
          fee.collectingFeeType === FIXED_FEE_COLLECTING_TYPE.HBARS &&
          fee?.hbarAmount
        ) {
          fixedFee.setHbarAmount(new Hbar(fee.hbarAmount))
        }

        return fixedFee;
      }

      case FEE.FRACTIONAL:
        return new CustomFractionalFee(fee);

      case FEE.ROYALTY:
        if (fee.fallbackFee) {
          fallbackFee = new CustomFixedFee().setHbarAmount(new Hbar(fee.fallbackFee))
        }
        return new CustomRoyaltyFee({
          ...fee,
          fallbackFee: fallbackFee !== null ? fallbackFee : undefined,
        })
    }
  });
}
