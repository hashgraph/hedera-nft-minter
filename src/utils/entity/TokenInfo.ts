/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

export enum TokenSupplyType {
  INFINITE = 'INFINITE',
  FINITE = 'FINITE',
}

interface TokenInfoKey {
  key: string;
  _type: string;
}

export interface TokenInfo {
  admin_key: TokenInfoKey | null,
  auto_renew_account: string | null,
  auto_renew_period: string | null,
  created_timestamp: string | null,
  decimals: number,
  expiry_timestamp: string | null,
  freeze_default: boolean,
  fee_schedule_key: TokenInfoKey | null,
  freeze_key: TokenInfoKey | null,
  initial_supply: string | null,
  kyc_key: TokenInfoKey | null,
  name: string | null,
  supply_key: TokenInfoKey | null,
  deleted: boolean,
  symbol: string | null,
  token_id: string | null,
  total_supply: string | null,
  treasury_account_id: string | null,
  type?: 'FUNGIBLE_COMMON' | 'NON_FUNGIBLE_UNIQUE',
  supply_type: TokenSupplyType,
  wipe_key: string | null,
  custom_fees?: string | null,
  pause_key: TokenInfoKey | null,
  pause_status: string | null,
  max_supply: string | null,
}
