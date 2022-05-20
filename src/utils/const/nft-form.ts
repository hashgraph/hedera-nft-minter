import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { Fees } from '@utils/entity/Fees';
import { TOKEN_KEY, TokenKey } from '@utils/entity/TokenKeys';

type RequiredKey = 'account' | 'custom';
export type OptionalKey = 'no' | RequiredKey;

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
    { type: TOKEN_KEY.TREASURY, value: 'account' }
  ],
  fees: [],
};
