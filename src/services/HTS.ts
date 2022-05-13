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
  PublicKey,
  CustomFee,
} from '@hashgraph/sdk';
import { Buffer } from 'buffer';

type AccountInfo = Response & {
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
  treasury_account_id: string;
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
    accountId,
    tokenName,
    tokenSymbol,
    amount,
    admin_key,
    freeze_key,
    pause_key,
    kyc_key,
    supply_key,
    treasury_account_id,
    wipe_key,
    customFees,
  }: NewTokenType): Promise<TokenCreateTransaction> {
    let accountInfo: AccountInfo = await window.fetch(
      'https://testnet.mirrornode.hedera.com/api/v1/accounts/' + accountId,
      { method: 'GET' }
    );

    accountInfo = await accountInfo.json();

    if (!accountInfo.key) {
      throw new Error(
        'Error when loading user key from hedera mirrornode API(testnet)!'
      );
    }

    const generateKey = (key: string) => PublicKey.fromString(key);
    const generatedKeyFromAccount = PublicKey.fromString(accountInfo.key.key);

    const expirationTime = new Date(Date.now() + 3600 * 24 * 12);

    const keyGenerator = (key: string | undefined) => {
      if (!key) {
        return undefined;
      }
      return key === 'account_key' ? generatedKeyFromAccount : generateKey(key);
    };

    const token = new TokenCreateTransaction({
      tokenName,
      tokenSymbol,
      decimals: 0,
      treasuryAccountId: treasury_account_id,
      adminKey: keyGenerator(admin_key),
      kycKey: keyGenerator(kyc_key),
      freezeKey: keyGenerator(freeze_key),
      wipeKey: keyGenerator(wipe_key),
      pauseKey: keyGenerator(pause_key),
      supplyKey: keyGenerator(supply_key),
      expirationTime: expirationTime,
      tokenType: TokenType.NonFungibleUnique,
      supplyType: TokenSupplyType.Finite,
      maxSupply: amount,
      customFees,
    });

    // eslint-disable-next-line no-console
    console.log({ token });

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
