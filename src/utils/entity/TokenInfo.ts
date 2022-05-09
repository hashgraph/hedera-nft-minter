export interface TokenInfo {
  admin_key: string | null,
  auto_renew_account: string | null,
  auto_renew_period: string | null,
  created_timestamp: string | null,
  decimals: number,
  expiry_timestamp: string | null,
  freeze_default: boolean,
  fee_schedule_key: string | null,
  freeze_key: string | null,
  initial_supply: string | null,
  kyc_key: string | null,
  name: string | null,
  supply_key: string | null,
  deleted: boolean,
  symbol: string | null,
  token_id: string | null,
  total_supply: string | null,
  treasury_account_id: string | null,
  type: 'FUNGIBLE_COMMON' | 'NON_FUNGIBLE_UNIQUE',
  wipe_key: string | null,
  // custom_fees: string | null,
  pause_key: string | null,
  pause_status: string | null,
}
