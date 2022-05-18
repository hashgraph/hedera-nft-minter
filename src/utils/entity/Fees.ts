import { CustomFixedFee } from '@hashgraph/sdk';

export enum FEE {
  ROYALITY = 'royality',
  FRACTIONAL = 'fractional',
  FIXED = 'fixed'
}

export interface RoyalityFee {
  type: FEE.ROYALITY,
  feeCollectorAccountId: string,
  fallbackFee: CustomFixedFee,
  numerator: number,
  denominator: number,
}

export interface FractionalFee {
  type: FEE.FRACTIONAL,
  feeCollectorAccountId: string,
  numerator: number,
  denominator: number,
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
}

export type Fees = RoyalityFee | FractionalFee | FixedFee;
