import { PublicKey } from '@hashgraph/sdk';
import { FormikValues } from 'formik';
import _ from 'lodash';

const generateKey = (
  keys: FormikValues,
  key: string,
  value: string,
  generatedKeyFromAccount: PublicKey | false = false
) => {
  switch (value) {
    case 'custom':
      return PublicKey.fromString(keys[`${ key }_key`]);
    case 'account':
      return generatedKeyFromAccount;
    default:
      return;
  }
};

export const nftFormKeysGenerator = (values: FormikValues, userKey: string) => {
  const keys = _.pickBy(values, (_: string, key: string) => {
    const keys = ['admin', 'freeze', 'kyc', 'supply', 'wipe', 'pause'];
    return keys.filter((k) => key.includes(k)).length > 0;
  }) as FormikValues;

  const keysTypes = _.pickBy(keys, (_, key) => !key.includes('_key'));

  const generatedKeyFromAccount = PublicKey.fromString(userKey);

  const newKeys = {};
  for (const [key, value] of Object.entries(keysTypes)) {
    const generatedKey = generateKey(
      keys,
      key,
      value,
      value === 'account' ? generatedKeyFromAccount : false
    );
    if (generatedKey) {
      newKeys[`${ key }Key`] = generatedKey;
    }
  }
  return newKeys;
};
