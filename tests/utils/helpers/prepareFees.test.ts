import { describe, expect, it } from '@jest/globals';
import prepareFees from '@utils/helpers/prepareFees';
import { FEE, Fees } from '@utils/entity/Fees';
import { CustomFixedFee, CustomRoyaltyFee, Hbar } from '@hashgraph/sdk';

describe('Prepare Fees', () => {
  it('empty', () => {
    expect(prepareFees([], '')).toBe([])
  });

  it('should be fixed fee', () => {
    const fees: Fees[] = [
      { type: FEE.FIXED, amount: 10, accountId: '1234567890' },
    ];

    const shouldBe = new CustomFixedFee({feeCollectorAccountId: '0987654321'});

    shouldBe.setHbarAmount(new Hbar(10))

    expect(prepareFees(fees, '0987654321')).toStrictEqual([shouldBe])
  });

  it('should be royalty fee', () => {
    const fee: Fees = {
      type: FEE.ROYALTY,
      percent: 10,
      fallbackFee: 10,
      feeCollectorAccountId: '1234567890'
    };

    const shouldBe = new CustomFixedFee();

    shouldBe.setHbarAmount(new Hbar(10))

    const royaltyFee = new CustomRoyaltyFee({
      numerator: fee.percent,
      denominator: 100,
      feeCollectorAccountId: '1234567890',
      fallbackFee: shouldBe,
    })

    expect(prepareFees([fee], '0987654321')).toStrictEqual([royaltyFee])
  });
});
