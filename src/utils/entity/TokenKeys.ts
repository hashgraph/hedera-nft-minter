export enum TOKEN_KEY {
  TREASURY = 'treasuryAccountId',
  KYC = 'kycKey',
  ADMIN = 'adminKey',
  FREEZE = 'freezeKey',
  WIPE = 'wipeKey',
  PAUSE = 'pauseKey',
  SUPPLY = 'supplyKey'
}

export interface TresauryKeyAccount {
  type: TOKEN_KEY.TREASURY,
  value: 'account',
}
export interface TresauryKeyCustom {
  type: TOKEN_KEY.TREASURY,
  value: 'custom',
  key: string,
}

export interface TokenKeyNoOrAccount {
  type: TOKEN_KEY,
  value: 'account'
}

export interface TokenKeyCustom {
  type: TOKEN_KEY,
  value: 'custom',
  key: string
}

export type TokenKey = TresauryKeyAccount | TresauryKeyCustom | TokenKeyNoOrAccount | TokenKeyCustom;
