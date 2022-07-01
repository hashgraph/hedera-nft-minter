export enum TOKEN_KEY {
  TREASURY = 'treasuryAccountId',
  KYC = 'kycKey',
  ADMIN = 'adminKey',
  FREEZE = 'freezeKey',
  WIPE = 'wipeKey',
  PAUSE = 'pauseKey',
  SUPPLY = 'supplyKey'
}

export interface TreasuryKeyAccount {
  type: TOKEN_KEY.TREASURY,
  value: 'account',
}
export interface TreasuryKeyCustom {
  type: TOKEN_KEY.TREASURY,
  value: 'custom',
  key: string,
}

export interface TokenKeyNoOrAccount {
  type?: TOKEN_KEY,
  value: 'account'
}

export interface TokenKeyCustom {
  type?: TOKEN_KEY,
  value: 'custom',
  key: string
}

export type TreasuryKey = TreasuryKeyAccount | TreasuryKeyCustom
export type TokenKey =  TokenKeyNoOrAccount | TokenKeyCustom;
