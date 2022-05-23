import { PublicKey, Key } from '@hashgraph/sdk';
import { TokenKey } from '@utils/entity/TokenKeys';

interface Keys {
  [key: string]: Key,
}

export default function transformToKeys(keys: TokenKey[], accountKey: string) {
  return keys.reduce<Keys>((keysObject, key) => {
    keysObject[key.type] = PublicKey.fromString(key.value === 'account' ? accountKey : key.key);
    return keysObject;
  }, {});
}
