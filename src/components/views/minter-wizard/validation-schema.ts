import * as yup from 'yup';
import { FEE } from '@utils/entity/Fees';
import { MintTypes } from '@/utils/entity/MinterWizard';

const feeValidator = yup.object().shape({
  type: yup.string()
    .oneOf(Object.values(FEE), 'Select a type!')
    .ensure(),

  feeCollectorAccountId: yup.string().when(['type'], {
    is: (type : FEE) => [FEE.ROYALITY, FEE.FRACTIONAL, FEE.FIXED].includes(type),
    then: yup.string().required('Required'),
  }),

  percent: yup.number().when(['type'], {
    is: (type : FEE) => [FEE.ROYALITY, FEE.FRACTIONAL].includes(type),
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
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  symbol: yup
    .string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  creator: yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
  creatorDID: yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
  description: yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
  qty: yup.number().min(1, 'Min 1!').max(10, 'Max 10!').required('Required'),
  maxSupply: yup.number().min(1, 'Min 1!').required('Required'),
  properties: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .when(['value'], {
          is: (value : string) => !!value,
          then: (schema) => schema.required('Required')
        }),
      value: yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .when(['name'], {
          is: (name : string) => !!name,
          then: (schema) => schema.required('Required')
        }),
    }, [['name', 'value']])
  ),
  token_id: yup.string().when(['mintType'], {
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
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .when(['value'], {
          is: (value : string) => !!value,
          then: (schema) => schema.required('Required')
        }),
      value: yup
        .string()
        .min(3, 'Too Short!')
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
});
