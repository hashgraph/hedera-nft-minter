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
  TokenUpdateTransaction,
  Key,
  Timestamp,
} from '@hashgraph/sdk';
import { Buffer } from 'buffer';
import { HEDERA_NETWORK } from '@/../Global.d';
import transformToKeys from '@helpers/transformToKeys';
import prepareFees from '@/utils/helpers/prepareFees';
import { Fees } from '@utils/entity/Fees';

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
  pause_key?: string;
  customFees?: Fees[];
  keys?: string[];
};

type UpdateTokenProps = {
  tokenId?: string | TokenId;
  tokenName?: string;
  tokenSymbol?: string;
  treasuryAccountId?: string | AccountId;
  adminKey?: Key;
  kycKey?: Key;
  freezeKey?: Key;
  wipeKey?: Key;
  supplyKey?: Key;
  autoRenewAccountId?: string | AccountId;
  expirationTime?: Date | Timestamp;
  autoRenewPeriod?: number | import('long').Long;
  tokenMemo?: string;
  feeScheduleKey?: Key;
  pauseKey?: Key;
} | undefined

export default class HTS {
  static async createToken({
    ...tokenProps
  }: NewTokenType): Promise<TokenCreateTransaction> {
    const accountInfo: AccountInfo = await window.fetch(
      `https://${ HEDERA_NETWORK === 'mainnet' ? 'mainnet-public' : HEDERA_NETWORK }.mirrornode.hedera.com/api/v1/accounts/${ tokenProps.accountId }`,
      { method: 'GET' }
    ).then(res => res.json());

    if (!accountInfo.key?.key) {
      throw new Error('Error while try to fetch user Public key.');
    }

    const expirationTime = new Date(Date.now() + 3600 * 24 * 12);

    const token = new TokenCreateTransaction({
      tokenType: TokenType.NonFungibleUnique,
      supplyType: TokenSupplyType.Finite,
      decimals: 0,
      expirationTime,
      ...tokenProps,
      customFees: tokenProps.customFees && tokenProps.customFees.length ? prepareFees(tokenProps.customFees, tokenProps.accountId) : undefined,
      ...(tokenProps.keys ? transformToKeys(tokenProps.keys, tokenProps.accountId, accountInfo.key.key) : {})
    });

    token.setMaxTransactionFee(50);

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

  static updateToken(tokenId: string | TokenId, acc1: string, newValues: UpdateTokenProps) {
    const txID = TransactionId.generate(acc1);

    const updateTx = new TokenUpdateTransaction(newValues)
      .setTransactionId(txID)
      .setTokenId(tokenId)
      .setNodeAccountIds([ new AccountId(3) ])
      .freeze();

    return updateTx;
  }

  static sendNFT(tokenId: string | TokenId, serial: number, sender: string, receiver: string) {
    const txID = TransactionId.generate(sender);

    const tx = new TransferTransaction()
      .setTransactionId(txID)
      .addNftTransfer(tokenId, serial, sender, receiver)
      .setNodeAccountIds([new AccountId(3)])
      .freeze();

    return tx;
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
