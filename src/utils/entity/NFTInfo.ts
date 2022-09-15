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
