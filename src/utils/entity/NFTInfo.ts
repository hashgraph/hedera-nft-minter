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

import { TokenInfo } from '@utils/entity/TokenInfo';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';

export interface NFTInfo {
  account_id: string,
  created_timestamp: string,
  deleted: boolean,
  metadata: string,
  modified_timestamp: string,
  serial_number: number,
  token_id: string,
  meta?: NFTMetadata
  spender: null | string;
}

export interface NFTInfoWithMetadata extends NFTInfo {
  meta?: NFTMetadata;
  collection_info: TokenInfo;
}

export interface NFTTransactionHistory {
  id: string;
  receiver_account_id?: string;
  sender_account_id?: string;
  type: string;
  token_id: string;
  transactions?: NFTTransaction[];
}

interface NFTTransaction {
  consensus_timestamp: string;
  is_approval: boolean;
  nonce: number;
  receiver_account_id: string;
  sender_account_id: string;
  transaction_id: string;
  type: string;
}
