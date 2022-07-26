import { TokenInfo, TokenInfoKey } from '@utils/entity/TokenInfo';

export const canIncreaseSupplyForTokenWithKey = (token : TokenInfo, key: TokenInfoKey) => {
  return (token?.supply_key?.key === key.key || token?.admin_key?.key === key.key)
}
