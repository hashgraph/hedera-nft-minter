interface Key {
  key: string;
  _type: string;
}

export interface TokenInfo {
  admin_key: Key,
  auto_renew_account: string | null,
  auto_renew_period: string | null,
  created_timestamp: string | null,
  decimals: number,
  expiry_timestamp: string | null,
  freeze_default: boolean,
  fee_schedule_key: Key,
  freeze_key: Key,
  initial_supply: string | null,
  kyc_key: Key,
  name: string | null,
  supply_key: Key,
  deleted: boolean,
  symbol: string | null,
  token_id: string | null,
  supply_type: string | null,
  total_supply: string | null,
  treasury_account_id: string | null,
  type: 'FUNGIBLE_COMMON' | 'NON_FUNGIBLE_UNIQUE',
  wipe_key: string | null,
  // custom_fees: string | null,
  pause_key: Key,
  pause_status: string | null,
  max_supply: string | null,
}
