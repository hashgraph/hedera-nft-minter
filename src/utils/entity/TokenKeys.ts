export enum TOKEN_KEY {
  TREASURY = 'treasury',
  KYC = 'kyc',
  ADMIN = 'admin',
  FREEZE = 'freeze',
  WIPE = 'wipe',
  PAUSE = 'pause',
  SUPPLY = 'supply',
  NONE = 'none',
}

export interface TresauryKeyAccount {
  type: TOKEN_KEY.TREASURY;
  value: 'account' | 'custom';
}
export interface TresauryKeyCustom {
  type: TOKEN_KEY.TREASURY;
  value: 'custom';
  key: string;
}

export interface TokenKeyNoOrAccount {
  type: TOKEN_KEY;
  value: 'account';
}

export interface TokenKeyCustom {
  type: TOKEN_KEY;
  value: 'custom';
  key: string;
}

export type TokenKey =
  | TresauryKeyAccount
  | TresauryKeyCustom
  | TokenKeyNoOrAccount
  | TokenKeyCustom;
