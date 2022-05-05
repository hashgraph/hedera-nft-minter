import {
  Hbar,
  TokenCreateTransaction,
  TokenMintTransaction,
  TransactionId,
  TransferTransaction,
  AccountId, TokenId, TokenType, TokenSupplyType, PublicKey
} from '@hashgraph/sdk';
import {Buffer} from 'buffer'

type AccountInfo = Response & {
  result?: string;
  key?: {
    key: string;
  }
}

export default class HTS {
  static async createToken(tokenName: string, tokenSymbol: string, accountId: string, amount: number): Promise<TokenCreateTransaction> {

    let accountInfo : AccountInfo = await window.fetch('https://testnet.mirrornode.hedera.com/api/v1/accounts/' + accountId, { method: 'GET' });

    accountInfo  = await accountInfo.json();

    if(!accountInfo.key){
      throw new Error('Error when loading user key from hedera mirrornode API(testnet)!');
    }

    const key = PublicKey.fromString(accountInfo.key.key)

    const expirationTime = new Date(Date.now() + 3600 * 24 * 12);
    const token = new TokenCreateTransaction({
      tokenName,
      tokenSymbol,
    })
      .setInitialSupply(0)
      .setMaxSupply(amount)
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setSupplyKey(key)
      .setAdminKey(key)
      .setSupplyType(TokenSupplyType.Finite)
      .setTreasuryAccountId(AccountId.fromString(accountId))
      .setExpirationTime(expirationTime)

    // eslint-disable-next-line no-console
    console.log({ token });

    return token;
  }

  static mintToken(tokenId: string | TokenId, acc1: string, cids: string[]) {
    const txID = TransactionId.generate(acc1);
    const meta = cids.map(cid => Buffer.from(`ipfs://${ cid }`));

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
      .freeze()
    ;

    return tx;
  }
}
