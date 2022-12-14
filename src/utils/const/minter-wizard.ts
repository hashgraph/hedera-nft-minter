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

import { Fees } from '@utils/entity/Fees';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { TOKEN_KEY } from '@utils/entity/TokenKeys';

type TreasuryAccountId = {
  type: TOKEN_KEY.TREASURY,
  value: string
}

export interface WizardValues extends NFTMetadata {
  mint_type: string;
  symbol?: string;
  token_id?: string;
  is_multiple_mint?: 'true' | 'false';
  qty: number;
  maxSupply: number;
  edition_name?: string;
  serial_number?: string;
  serial_metadata?: string;
  keys: TOKEN_KEY[];
  treasuryAccountId: TreasuryAccountId[],
  fees: Fees[];
  leftToMint: null | number
}

export const initialValues: WizardValues = {
  mint_type: '',
  is_multiple_mint: 'false',
  name: '',
  edition_name: '',
  serial_number: '',
  serial_metadata: '',
  symbol: '',
  creator: '',
  description: '',
  type: '',
  image: null,
  files: [],
  properties: [
    {
      label: '',
      value: '',
    },
  ],
  attributes: [
    {
      trait_type: '',
      value: '',
    }
  ],
  qty: 1,
  maxSupply: 10,
  leftToMint: null,
  token_id: '',
  treasuryAccountId: [
    { type: TOKEN_KEY.TREASURY, value: 'account' },
  ],
  keys: [TOKEN_KEY.SUPPLY],
  fees: [],
};
