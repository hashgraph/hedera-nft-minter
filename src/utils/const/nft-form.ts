import { NFTMetadata } from '@utils/entity/NFT-Metadata';
import { Fee } from '@/services/HTS';

type RequiredKey = 'account' | 'custom';
export type OptionalKey = 'no' | RequiredKey;
export type FeeKey = 'royaltyFee' | 'fractionalFee' | 'fixedFee';

export type FormValues = NFTMetadata & {
  symbol?: string;
  qty: number;
  treasury: RequiredKey;
  treasury_account_id?: string;
  kyc: OptionalKey;
  kyc_key?: string | 'account_key';
  admin: OptionalKey;
  admin_key?: string | 'account_key';
  freeze: OptionalKey;
  freeze_key?: string | 'account_key';
  wipe: OptionalKey;
  wipe_key?: string | 'account_key';
  supply: OptionalKey;
  supply_key?: string | 'account_key';
  pause: OptionalKey;
  pause_key?: string | 'account_key';
  fees: FeeKey[];
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
