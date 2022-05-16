import {
  Hbar,
  TokenCreateTransaction,
  TokenMintTransaction,
  TransactionId,
  TransferTransaction,
  AccountId,
  TokenId,
  TokenType,
  TokenSupplyType,
  CustomFee,
} from '@hashgraph/sdk';
import { Buffer } from 'buffer';

export type AccountInfo = Response & {
  result?: string;
  key?: {
    key: string;
  };
};

export type NewTokenType = {
  accountId: string;
  tokenName: string;
  tokenSymbol: string;
  amount: number;
  admin_key?: string;
  freeze_key?: string;
  kyc_key?: string;
  supply_key?: string;
  wipe_key?: string;
  treasuryAccountId: string;
  pause_key?: string;
  customFees?: CustomFee[];
};

export type Fee = {
  feeCollectorAccountId: string | AccountId;
  amount?: number;
  hbarAmount?: number;
  denominatingTokenId?: string;
  numerator?: number;
  denominator?: number;
  fallbackFee?: number;
  min?: number;
  max?: number;
  assessmentMethod?: 'inclusive' | 'exclusive';
};

export default class HTS {
  static async createToken({
    amount,
    ...tokenProps
  }: NewTokenType): Promise<TokenCreateTransaction> {
    const expirationTime = new Date(Date.now() + 3600 * 24 * 12);

    const token = new TokenCreateTransaction({
      tokenType: TokenType.NonFungibleUnique,
      supplyType: TokenSupplyType.Finite,
      decimals: 0,
      maxSupply: amount,
      expirationTime,
      ...tokenProps,
    });

    return token;
  }

  static mintToken(tokenId: string | TokenId, acc1: string, cids: string[]) {
    const txID = TransactionId.generate(acc1);
    const meta = cids.map((cid) => Buffer.from(`ipfs://${ cid }`));

    const mintTx = new TokenMintTransaction()
      .setTransactionId(txID)
      .setTokenId(tokenId)
      .setNodeAccountIds([new AccountId(3)])
      .setMetadata(meta)
      .freeze();

    return mintTx;
  }

  static transfer(acc1: string, acc2: string) {
    const txID = TransactionId.generate(acc1);
    const tx = new TransferTransaction()
      .setTransactionId(txID)
      .addHbarTransfer(acc1, new Hbar(-1))
      .addHbarTransfer(acc2, new Hbar(1))
      .setNodeAccountIds([new AccountId(3)])
      .freeze();
    return tx;
  }
}
