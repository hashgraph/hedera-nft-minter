import {
  Transaction,
  AccountId,
  TransactionId,
} from '@hashgraph/sdk'

export class SigningService {
  static async signAndMakeBytes(trans: Transaction, signingAcctId: string) {
    const transId = TransactionId.generate(signingAcctId)

    trans.setTransactionId(transId);
    trans = await trans.freeze();
    const transBytes = trans.toBytes();

    return transBytes;
  }

  static async makeBytes(trans: Transaction, signingAcctId: string) {
    const transId = TransactionId.generate(signingAcctId)

    trans.setTransactionId(transId);
    trans.setNodeAccountIds([new AccountId(3)]);

    await trans.freeze();

    const transBytes = trans.toBytes();

    return transBytes;
  }
}
