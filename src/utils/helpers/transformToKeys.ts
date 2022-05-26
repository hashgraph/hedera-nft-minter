import { AccountId, Key, PublicKey } from '@hashgraph/sdk';
import { TOKEN_KEY, TokenKey } from '@utils/entity/TokenKeys';

interface Keys {
  [key: string]: Key | AccountId,
}

export default function transformToKeys(keys: TokenKey[], accountId: string, accountKey: string) {
  return keys.reduce<Keys>((keysObject, key) => {
    if (key.type === TOKEN_KEY.TREASURY) {
      keysObject[key.type] = AccountId.fromString(key.value === 'account' ? accountId: key.key);
      return keysObject;
    }

    keysObject[key.type] = PublicKey.fromString(key.value === 'account' ? accountKey : key.key);
    return keysObject;
  }, {});
}
