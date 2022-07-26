import * as yup from 'yup';
import { FEE } from '@utils/entity/Fees';
import { MintTypes } from '@/utils/entity/MinterWizard';

const feeValidator = yup.object().shape({
  type: yup.string()
    .oneOf(Object.values(FEE), 'Select a type!')
    .ensure(),

  feeCollectorAccountId: yup.string().when(['type'], {
    is: (type : FEE) => [FEE.ROYALTY, FEE.FRACTIONAL, FEE.FIXED].includes(type),
    then: yup.string().required('Required'),
  }),

  percent: yup.number().when(['type'], {
    is: (type : FEE) => [FEE.ROYALTY, FEE.FRACTIONAL].includes(type),
    then: yup.number().max(100, 'Max 100%!').required('Required'),
  }),

});

const keyValidator = yup.object().shape({
  type: yup.string()
    .required('Required'),
  value: yup.string().oneOf(['custom', 'account'])
    .required('Required'),
  key: yup.string()
    .when('value', {
      is: 'custom',
      then: yup.string().required('Required')
    })
})

export const ValidationSchema = yup.object().shape({
  image: yup.mixed().test('type', 'Only image files are accepted!', (value) => {
    switch(typeof value){
      case 'object':
        return value ? value?.type?.includes('image/') : true;
      case 'string':
        return true
    }
  }),
  name: yup
    .string()
    .max(50, 'Too Long!')
    .required('Required'),
  edition_name: yup
    .string()
    .max(50, 'Too Long!'),
  symbol: yup
    .string()
    .max(50, 'Too Long!')
    .required('Required'),
  creator: yup.string().max(50, 'Too Long!'),
  creatorDID: yup.string().max(50, 'Too Long!'),
  description: yup.string().max(500, 'Too Long!'),
  qty: yup.number().min(1, 'Min 1!').max(10, 'Max 10!').required('Required'),
  maxSupply: yup
    .number()
    .when(['mint_type'], {
      is: (mintType : string) => mintType === MintTypes.NewCollectionNewNFT,
      then: (schema) => schema.min(1, 'Min 1!').required('Required'),
      otherwise: (schema) => schema
  }),
  properties: yup.array().of(
    yup.object().shape({
      label: yup
        .string()
        .max(50, 'Too Long!')
        .when(['value'], {
          is: (value : string) => !!value,
          then: (schema) => schema.required('Required')
        }),
      value: yup
        .string()
        .max(50, 'Too Long!')
        .when(['label'], {
          is: (label : string) => !!label,
          then: (schema) => schema.required('Required')
        }),
    }, [['label', 'value']])
  ),
  token_id: yup.string().when(['mint_type'], {
    is: (mintType : MintTypes) => [
      MintTypes.ExistingCollectionExistingNFT,
      MintTypes.ExistingCollectionNewNFT,
     ].includes(mintType),
    then: yup.string().required('Required'),
  }),
  attributes: yup.array().of(
    yup.object().shape({
      trait_type: yup
        .string()
        .max(50, 'Too Long!')
        .when(['value'], {
          is: (value : string) => !!value,
          then: (schema) => schema.required('Required')
        }),
      value: yup
        .string()
        .max(50, 'Too Long!')
        .when(['trait_type'], {
          is: (trait_type : string) => !!trait_type,
          then: (schema) => schema.required('Required')
        })
        ,
    }, [['trait_type', 'value']])
  ),
  fees: yup.array().of(feeValidator),
  keys: yup.array().of(keyValidator),
  treasuryAccountId: yup.array().of(keyValidator),
});
