import { TokenKey } from '@utils/entity/TokenKeys';

interface Keys {
  [key: string]: string,
}

export default function transformToKeys(keys: TokenKey[], accountKey: string) {
  return keys.reduce<Keys>((keysObject, key) => {
    keysObject[key.type] = key.value === 'account' ? accountKey : key.key ;
    return keysObject;
  }, {});
}
