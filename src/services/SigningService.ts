import {
  Transaction,
  AccountId,
  TransactionId,
} from '@hashgraph/sdk'

export class SigningService {
  static signAndMakeBytes(trans: Transaction, signingAcctId: string) {
    const transId = TransactionId.generate(signingAcctId)

    trans.setTransactionId(transId);
    trans = trans.freeze();
    const transBytes = trans.toBytes();

    return transBytes;
  }

  static makeBytes(trans: Transaction, signingAcctId: string) {
    const transId = TransactionId.generate(signingAcctId)

    trans.setTransactionId(transId);
    trans.setNodeAccountIds([new AccountId(3)]);

    trans.freeze();

    const transBytes = trans.toBytes();

    return transBytes;
  }
}
