import { Fees } from '@utils/entity/Fees';
import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { TOKEN_KEY, TokenKey } from '@utils/entity/TokenKeys';

export type FormValues = NFTMetadata & {
  symbol?: string;
  qty: number;
  keys: TokenKey[],
  fees: Fees[];
};

export const initialValues: FormValues = {
  name: '',
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
  keys: [
    { type: TOKEN_KEY.SUPPLY, value: 'account' }
  ],
  fees: [],
};
