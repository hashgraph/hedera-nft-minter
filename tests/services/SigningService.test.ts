import { Buffer } from 'buffer';
import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { SigningService } from '@services/SigningService';
import { AccountCreateTransaction, AccountId, PrivateKey, TransactionId } from '@hashgraph/sdk'

describe('Test Signing service', () => {
  const pkString = '704085272b147ecc6cf8eed094016555e7eaf68eb4145f0473746053adaecf00';

  beforeEach(() => {
    const mockFn = jest.fn().mockReturnValue(TransactionId.fromString('0.0.123456@1666180043.380955673'));

    TransactionId.generate = mockFn as () => TransactionId;
  })

  // '0.0.123456@1666180043.380955673'
  test('signAndMakeBytes', async () => {
    const pk = PrivateKey.fromString(pkString);
    const tx = new AccountCreateTransaction()
      .setKey(pk)
      .setNodeAccountIds([new AccountId(3)])
    ;

    const bytes = SigningService.signAndMakeBytes(tx, '0.0.123456');
    const correct = Buffer.from([10, 123, 42, 121, 10]);

    expect(bytes.slice(0, 5)).toEqual(correct)
  });

  test('makeBytes', async () => {
    const pk = PrivateKey.fromString(pkString);
    const tx = new AccountCreateTransaction()
      .setKey(pk)
    ;

    const bytes = SigningService.makeBytes(tx, '0.0.123456');
    const correct = Buffer.from([10, 123, 42, 121, 10]);

    expect(bytes.slice(0, 5)).toEqual(correct)
  });

});
