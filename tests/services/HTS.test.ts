import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { AccountId, Hbar, TokenMintTransaction, TokenUpdateTransaction, TransactionId, TransferTransaction } from '@hashgraph/sdk'
import HTS from '@services/HTS';

describe('Test HTS service', () => {

  beforeEach(() => {
    const mockFn = jest.fn().mockReturnValue(TransactionId.fromString('0.0.123456@1666180043.380955673'));

    TransactionId.generate = mockFn as () => TransactionId;
  })

  // '0.0.123456@1666180043.380955673'
  test('mintToken', async () => {
    const mintTx = HTS.mintToken('0.0.123456', '0.0.987654', ['bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm']);

    expect(mintTx).toEqual(
      new TokenMintTransaction()
        .setTransactionId(TransactionId.generate('test'))
        .setTokenId('0.0.123456')
        .setNodeAccountIds([new AccountId(3)])
        .setMetadata([Buffer.from('ipfs://bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm')])
        .freeze()
    );
  });

  test('updateToken', async () => {
    const updateTx = HTS.updateToken('0.0.123456', '0.0.987654', {
      tokenName: 'test'
    });

    expect(updateTx).toEqual(
      new TokenUpdateTransaction({ tokenName: 'test' })
        .setTransactionId(TransactionId.generate('test'))
        .setTokenId('0.0.123456')
        .setNodeAccountIds([new AccountId(3)])
        .freeze()
    );
  });

  test('sendNFT', async () => {
    const updateTx = HTS.sendNFT('0.0.123456', 0,'0.0.987654', '0.0.654321');

    expect(updateTx).toEqual(
      new TransferTransaction()
        .setTransactionId(TransactionId.generate('test'))
        .addNftTransfer('0.0.123456', 0, '0.0.987654', '0.0.654321')
        .setNodeAccountIds([new AccountId(3)])
        .freeze()
    );
  });


  test('sendNFT', async () => {
    const updateTx = HTS.transfer('0.0.987654', '0.0.654321');

    expect(updateTx).toEqual(
      new TransferTransaction()
        .setTransactionId(TransactionId.generate('test'))
        .addHbarTransfer('0.0.987654', new Hbar(-1))
        .addHbarTransfer('0.0.654321', new Hbar(1))
        .setNodeAccountIds([new AccountId(3)])
        .freeze()
    );
  });




});
