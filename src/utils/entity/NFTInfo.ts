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
}
