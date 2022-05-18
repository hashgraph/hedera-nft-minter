import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { Fee } from '@/services/HTS';
import { Fees } from '@utils/entity/Fees';
import { TOKEN_KEY, TokenKey } from '@utils/entity/TokenKeys';

type RequiredKey = 'account' | 'custom';
type AccountKeyOrString = string | 'account_key';
export type OptionalKey = 'no' | RequiredKey;

export type FormValues = NFTMetadata & {
  symbol?: string;
  qty: number;
  keys: TokenKey[],
  treasury: RequiredKey;
  treasury_account_id?: string;
  kyc: OptionalKey;
  kyc_key?: AccountKeyOrString;
  admin: OptionalKey;
  admin_key?: AccountKeyOrString;
  freeze: OptionalKey;
  freeze_key?: AccountKeyOrString;
  wipe: OptionalKey;
  wipe_key?: AccountKeyOrString;
  supply: OptionalKey;
  supply_key?: AccountKeyOrString;
  pause: OptionalKey;
  pause_key?: AccountKeyOrString;
  fees: Fees[];
  activeFees: {
    royaltyFee?: Fee;
    fractionalFee?: Fee;
    fixedFee?: Fee;
  };
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
  treasury: 'account',
  kyc: 'no',
  admin: 'no',
  freeze: 'no',
  wipe: 'no',
  supply: 'account',
  pause: 'no',
  treasury_account_id: '',
  kyc_key: '',
  admin_key: '',
  freeze_key: '',
  wipe_key: '',
  supply_key: '',
  pause_key: '',
  fees: [],
  activeFees: {
    fractionalFee: {
      feeCollectorAccountId: '',
      numerator: 0,
      denominator: 0,
      min: 0,
      max: 0,
      assessmentMethod: 'inclusive',
    },
    royaltyFee: {
      feeCollectorAccountId: '',
      fallbackFee: 0,
      numerator: 0,
      denominator: 0,
    },
    fixedFee: {
      feeCollectorAccountId: '',
      denominatingTokenId: '',
      amount: 0,
      hbarAmount: 0,
    },
  },
};
