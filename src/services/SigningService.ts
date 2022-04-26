import {
  Client,
  PrivateKey,
  Transaction,
  AccountId,
  TransactionId,

} from '@hashgraph/sdk'

export class SigningService {

  client!: Client;
  pk = '302e020100300506032b657004220420f7ba4566a1a6d0bbc5f58f6e9e06b18fb12d5761d0e691157ffb432631569563';
  acc = '0.0.34190948';


  async init() {
    this.client = Client.forTestnet();
    this.client.setOperator(this.acc, this.pk);
  }

  async signAndMakeBytes(trans:Transaction, signingAcctId:string) {

    const privKey = PrivateKey.fromString(this.pk);
    const pubKey = privKey.publicKey;

    const nodeId = [new AccountId(3)];
    const transId = TransactionId.generate(signingAcctId)

    trans.setNodeAccountIds(nodeId);
    trans.setTransactionId(transId);

    trans = await trans.freeze();

    const transBytes = trans.toBytes();

    const sig = await privKey.signTransaction(Transaction.fromBytes(transBytes));

    const out = trans.addSignature(pubKey, sig);

    const outBytes = out.toBytes();

    return outBytes;
  }
  async signAndMakeBytesWithClient(trans : Transaction, signingAcctId:string) {

      const privateKey = PrivateKey.fromString(this.pk);
      const publicKey = privateKey.publicKey;

      const newId = TransactionId.generate(signingAcctId);
      trans.setTransactionId(newId);

    trans = await trans.freezeWith(this.client);

    const txBytes = trans.toBytes();

    const sig = privateKey.signTransaction(Transaction.fromBytes(txBytes));
    const out = trans.addSignature(publicKey, sig);
    const outBytes = out.toBytes();

    return outBytes;
  }

  async signAndMakeBytesWithKey(trans:Transaction, signingAcctId:string, key:PrivateKey|string|undefined = undefined) {

    const transId = TransactionId.generate(signingAcctId)
    trans.setTransactionId(transId);
    trans.setNodeAccountIds([new AccountId(3)]);

    await trans.freeze();

    if (key && typeof key === 'string')
      key = PrivateKey.fromString(key)

    if(typeof key !== 'undefined' && key instanceof PrivateKey )
      trans = await trans.sign(key)

    const transBytes = trans.toBytes();

    return transBytes;
  }

  async makeBytes(trans:Transaction, signingAcctId:string|AccountId) {

    const transId = TransactionId.generate(signingAcctId)
    await trans.setTransactionId(transId);
    await trans.setNodeAccountIds([new AccountId(3)]);

    await trans.freeze();

    const transBytes = await trans.toBytes();

    return transBytes;
  }
}

