export enum FEE {
  ROYALITY = 'royality',
  FRACTIONAL = 'fractional',
  FIXED = 'fixed'
}

export enum FIXED_FEE_COLLECTING_TYPE {
  TOKEN = 'token',
  HBARS = 'hbars'
}

export interface RoyalityFee {
  type: FEE.ROYALITY,
  feeCollectorAccountId: string,
  fallbackFee: number,
  percent?: number,
}

export interface FractionalFee {
  type: FEE.FRACTIONAL,
  feeCollectorAccountId: string,
  percent?: number,
  min: number,
  max: number,
  assessmentMethod: boolean,
}

export interface FixedFee {
  type: FEE.FIXED,
  feeCollectorAccountId: string,
  denominatingTokenId: string,
  amount: number,
  hbarAmount: number,
  collectingFeeType: FIXED_FEE_COLLECTING_TYPE.TOKEN | FIXED_FEE_COLLECTING_TYPE.HBARS
}

export type Fees = RoyalityFee | FractionalFee | FixedFee;
