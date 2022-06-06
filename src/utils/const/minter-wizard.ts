import { Fees } from '@utils/entity/Fees';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { TOKEN_KEY, TokenKey } from '@utils/entity/TokenKeys';

export type WizardValues = NFTMetadata & {
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
  fees: Fees[];
};

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
      name: 'website',
      value: 'www.mywebsite.com',
    },
    {
      name: 'license',
      value: 'Creative Common',
    },
  ],
  attributes: [
    {
      trait_type: 'hair',
      value: 'blue',
    },
    {
      trait_type: 'size',
      value: 'large',
    },
  ],
  qty: 1,
  maxSupply: 10,
  keys: [
    { type: TOKEN_KEY.TREASURY, value: 'account' },
    { type: TOKEN_KEY.SUPPLY, value: 'account' },
  ],
  fees: [],
};