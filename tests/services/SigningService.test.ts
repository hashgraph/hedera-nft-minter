import { Buffer } from 'buffer';
import { describe, test, expect } from '@jest/globals';
import { SigningService } from '@services/SigningService';
import { AccountCreateTransaction, AccountId, PrivateKey } from '@hashgraph/sdk'

describe('Test Signing service', () => {

  test('signAndMakeBytes', async () => {
    const pk = PrivateKey.generateECDSA()
    const tx = new AccountCreateTransaction()
      .setKey(pk)
      .setNodeAccountIds([new AccountId(3)])
    ;

    const bytes = SigningService.signAndMakeBytes(tx, '0.0.123456');
    const correct = Buffer.from([10, 124, 42, 122, 10]);

    expect(bytes.slice(0, 5)).toEqual(correct)
  });

  test('makeBytes', async () => {
    const pk = PrivateKey.generateECDSA()
    const tx = new AccountCreateTransaction()
      .setKey(pk)
    ;

    const bytes = SigningService.makeBytes(tx, '0.0.123456');
    const correct = Buffer.from([10, 123, 42, 121, 10]);

    expect(bytes.slice(0, 5)).toEqual(correct)
  });

});
