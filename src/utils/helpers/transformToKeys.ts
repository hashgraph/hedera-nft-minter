import { AccountId, Key, PublicKey } from '@hashgraph/sdk';
import { TOKEN_KEY, TokenKey } from '@utils/entity/TokenKeys';

interface Keys {
  [key: string]: Key | AccountId,
}

export default function transformToKeys(keys: TokenKey[], accountId: string, accountKey: string) {
  const newKeys = keys.reduce<Keys[]>((keysObject, key) => {
    keysObject[key] = PublicKey.fromString(accountKey)

    return keysObject;
  }, [])

  newKeys[TOKEN_KEY.TREASURY] = AccountId.fromString(accountId)

  return newKeys
}
