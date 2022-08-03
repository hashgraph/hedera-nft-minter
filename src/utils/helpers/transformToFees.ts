import { FEE, Fees } from '@utils/entity/Fees';
import { Hbar, CustomFixedFee, CustomRoyaltyFee } from '@hashgraph/sdk';

type HederaFee = CustomFixedFee | CustomRoyaltyFee;

export default function transformToFees(fees: Fees[]): HederaFee[] {
  return fees.map(fee => {
    let fallbackFee = null;

    switch (fee.type) {
      case FEE.FIXED:
        fallbackFee = new CustomFixedFee({ feeCollectorAccountId: fee.accountId });

        fallbackFee.setHbarAmount(new Hbar(fee.amount));

        return fallbackFee;

      case FEE.ROYALTY:
        if (fee.fallbackFee) {
          fallbackFee = new CustomFixedFee().setHbarAmount(new Hbar(fee.fallbackFee))
        }
        return new CustomRoyaltyFee({
          ...fee,
          fallbackFee: fallbackFee !== null ? fallbackFee : undefined,
        });
    }
  });
}
