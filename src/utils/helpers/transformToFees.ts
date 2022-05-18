import { FEE, Fees } from '@utils/entity/Fees';
import { CustomFixedFee, CustomFractionalFee, CustomRoyaltyFee } from '@hashgraph/sdk';

type HederaFee = CustomFixedFee | CustomFractionalFee | CustomRoyaltyFee;

export default function transformToFees(fees: Fees[]): HederaFee[] {
  return fees.map(fee => {
    switch (fee.type) {
      case FEE.FIXED:
        return new CustomFixedFee(fee);
      case FEE.FRACTIONAL:
        return new CustomFractionalFee(fee);
      case FEE.ROYALITY:
        return new CustomRoyaltyFee(fee)
    }
  });
}
