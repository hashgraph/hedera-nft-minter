import { FEE, Fees } from '@utils/entity/Fees';
import { Hbar, CustomFixedFee, CustomFractionalFee, CustomRoyaltyFee } from '@hashgraph/sdk';

type HederaFee = CustomFixedFee | CustomFractionalFee | CustomRoyaltyFee;

export default function transformToFees(fees: Fees[]): HederaFee[] {
  return fees.map(fee => {
    let fallbackFee = null;
    switch (fee.type) {
      case FEE.FIXED:
        return new CustomFixedFee(fee);
      case FEE.FRACTIONAL:
        return new CustomFractionalFee(fee);
      case FEE.ROYALITY:
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
