import { Fees } from '@utils/entity/Fees';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { TOKEN_KEY, TokenKey, TreasuryKey } from '@utils/entity/TokenKeys';

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
  keys: TokenKey[];
  treasuryAccountId: TreasuryKey[],
  fees: Fees[];
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
  creatorDID: '',
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
  token_id: '',
  treasuryAccountId: [
    { type: TOKEN_KEY.TREASURY, value: 'account' },
  ],
  keys: [
    { type: TOKEN_KEY.SUPPLY, value: 'account' },
  ],
  fees: [],
};
