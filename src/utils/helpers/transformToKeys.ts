/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { AccountId, Key, PublicKey } from '@hashgraph/sdk';
import { TOKEN_KEY } from '@utils/entity/TokenKeys';

interface Keys {
  [key: string]: Key | AccountId,
}

export default function transformToKeys(keys: string[], accountId: string, accountKey: string) {
  const newKeys = keys.reduce<Keys>((keysObject, key) => {
    keysObject[key] = PublicKey.fromString(accountKey)

    return keysObject;
  }, {})

  newKeys[TOKEN_KEY.TREASURY] = AccountId.fromString(accountId)

  return newKeys
}
