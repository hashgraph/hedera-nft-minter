
import { describe, it, expect } from '@jest/globals';
import transformToKeys from '@utils/helpers/transformToKeys';
import { AccountId, PublicKey } from '@hashgraph/sdk';

const keys = [
  'kycKey',
  'freezeKey',
  'pauseKey',
  'feeScheduleKey'
];

const accountId = AccountId.fromString('0.0.2661933');
const accountKey = PublicKey.fromString('3d9639fcb8137a17c0e0aba20a7fb5038f74269835ef32d3891415008e4db8d2');

const correctAnswerer = {
  'kycKey': accountKey,
  'freezeKey': accountKey,
  'pauseKey': accountKey,
  'feeScheduleKey': accountKey,
  'treasuryAccountId': accountId,
}

describe('Transform to keys', () => {
  it('keys transform', () => {
    expect(transformToKeys(keys, accountId.toString(), accountKey.toStringRaw())).toEqual(correctAnswerer);
  });
});
