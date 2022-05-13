import { PublicKey } from '@hashgraph/sdk';
import { FormikValues } from 'formik';
import _ from 'lodash';

type TokenKeysType = {
  adminKey?: PublicKey;
  freezeKey?: PublicKey;
  kycKey?: PublicKey;
  supplyKey?: PublicKey;
  wipeKey?: PublicKey;
  pauseKey?: PublicKey;
};

class TokenKeys {
  _keysNames = ['admin', 'freeze', 'kyc', 'supply', 'wipe', 'pause'];
  keys;
  keysTypes;
  generatedKeyFromAccount;

  constructor(values: FormikValues, userKey: string) {
    this.generatedKeyFromAccount = PublicKey.fromString(userKey);

    this.keys = _.pickBy(values, (_: string, key: string) => {
      const keys = ['admin', 'freeze', 'kyc', 'supply', 'wipe', 'pause'];
      return keys.filter((k) => key.includes(k)).length > 0;
    }) as FormikValues;

    this.keysTypes = _.pickBy(this.keys, (_, key) => !key.includes('_key'));
  }

  generateKey(key: string, value: string) {
    switch (value) {
      case 'custom':
        return PublicKey.fromString(this.keys[`${ key }_key`]);
      case 'account':
        return this.generatedKeyFromAccount;
      default:
        return;
    }
  }
}

export const nftFormKeysGenerator = (values: FormikValues, userKey: string) => {
  const tokenKeys = new TokenKeys(values, userKey);

  const newKeys = {} as TokenKeysType;
  for (const [key, value] of Object.entries(tokenKeys.keysTypes)) {
    const generatedKey = tokenKeys.generateKey(key, value);
    if (generatedKey) {
      newKeys[`${ key }Key`] = generatedKey;
    }
  }
  return newKeys;
};
