import { jest } from '@jest/globals';

export const bladeWeb3JsMock = () => jest.mock('@bladelabs/blade-web3.js', () => {
  return {
    HederaNetwork: {
      Testnet: 'testnet',
      Mainnet: 'mainnet'
    },
    BladeSigner: jest.fn(() => ({
      signTransaction: jest.fn(),
      onAccountChanged: jest.fn(),
    })),
  };
});

export const hashConnectMock = () => jest.mock('hashconnect', () => {
  return {
    HashConnectTypes: {
      WalletMetadata: {},
      SavedPairingData: {}
    },
    HashConnect: jest.fn(() => ({
      init: () => ({
        topic: '',
        pairingString: '',
        encryptionKey: '',
        savedPairings: [],
      }),
            foundExtensionEvent: {
        on: jest.fn(),
        off: jest.fn(),
      },
      pairingEvent: {
        on: jest.fn(),
        off: jest.fn(),
      },
      foundIframeEvent: {
        on: jest.fn(),
        off: jest.fn(),
      }
    })),
  };
});