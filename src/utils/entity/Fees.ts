export enum FEE {
  ROYALTY = 'royalty',
  FIXED = 'fixed',
}

export interface RoyalityFee {
  type: FEE.ROYALTY,
  feeCollectorAccountId: string,
  fallbackFee?: number,
  percent?: number,
}

export interface FixedFee {
  amount: number,
  type: FEE.FIXED,
  accountId: string,
}

export type Fees = RoyalityFee | FixedFee ;
