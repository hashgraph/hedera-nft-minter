export enum TokenSupplyType {
  INFINITE = 'INFINITE',
  FINITE = 'FINITE',
}

export interface TokenInfoKey {
  key: string;
  _type: string;
}

export interface TokenInfo {
  admin_key: TokenInfoKey,
  auto_renew_account: string | null,
  auto_renew_period: string | null,
  created_timestamp: string | null,
  decimals: number,
  expiry_timestamp: string | null,
  freeze_default: boolean,
  fee_schedule_key: TokenInfoKey,
  freeze_key: TokenInfoKey,
  initial_supply: string | null,
  kyc_key: TokenInfoKey,
  name: string | null,
  supply_key: TokenInfoKey,
  deleted: boolean,
  symbol: string | null,
  token_id: string | null,
  total_supply: string | null,
  treasury_account_id: string | null,
  type: 'FUNGIBLE_COMMON' | 'NON_FUNGIBLE_UNIQUE',
  supply_type: TokenSupplyType,
  wipe_key: string | null,
  // custom_fees: string | null,
  pause_key: TokenInfoKey,
  pause_status: string | null,
  max_supply: string | null,
}
