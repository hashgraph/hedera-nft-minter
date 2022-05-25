import * as yup from 'yup';
import { FEE, FIXED_FEE_COLLECTING_TYPE } from '@utils/entity/Fees';

const feeValidator = yup.object().shape({
  type: yup.string()
    .oneOf(Object.values(FEE))
    .ensure()
    .required('Required'),

  feeCollectorAccountId: yup.string().when(['type'], {
    is: (type : FEE) => [FEE.ROYALITY, FEE.FRACTIONAL, FEE.FIXED].includes(type),
    then: yup.string().required('Required'),
  }),

  fallbackFee: yup.number().when('type', {
    is: FEE.ROYALITY,
    then: yup.number().required('Required'),
  }),

  percent: yup.number().when(['type'], {
    is: (type : FEE) => [FEE.ROYALITY, FEE.FRACTIONAL].includes(type),
    then: yup.number().max(100, 'Max 100%!').required('Required'),
  }),

  max: yup.number().when('type', {
    is: FEE.FRACTIONAL,
    then: yup.number().required('Required')
  }),

  min: yup.number().when('type', {
    is: FEE.FRACTIONAL,
    then: yup.number()
      .required('Required')
      .when('max', (max, schema) =>
        schema.test({
          test: (min : number) => !!max && min < max,
          message: 'Min should be < max'
        })
     )
  }),

  assessmentMethod: yup.boolean().when('type', {
    is: FEE.FRACTIONAL,
    then: yup.boolean().required('Required')
  }),

  collectingFeeType: yup.string()
    .when('type', {
      is: FEE.FIXED,
      then: yup.string()
        .oneOf(Object.values(FIXED_FEE_COLLECTING_TYPE), 'Select a type!')
        .ensure()
        .required('Required'),
  }),

  hbarAmount: yup.string()
    .when(['type', 'collectingFeeType'], {
      is: (type : string, collectingFeeType : string) =>
        type === FEE.FIXED && collectingFeeType === FIXED_FEE_COLLECTING_TYPE.HBARS,
      then: yup.string().required('Required')
  }),

  amount: yup.string()
    .when(['type', 'collectingFeeType'], {
      is: (type : string, collectingFeeType : string) =>
        type === FEE.FIXED && collectingFeeType === FIXED_FEE_COLLECTING_TYPE.TOKEN,
      then: yup.string().required('Required')
  }),

  denominatingTokenId: yup.string()
    .when(['type', 'collectingFeeType'], {
      is: (type : string, collectingFeeType : string) =>
        type === FEE.FIXED && collectingFeeType === FIXED_FEE_COLLECTING_TYPE.TOKEN,
        then: yup.string().required('Required')
  })
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
    return value ? value.type.includes('image/') : true;
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
        .required('Required'),
      value: yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    })
  ),
  attributes: yup.array().of(
    yup.object().shape({
      trait_type: yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      value: yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    })
  ),
  fees: yup.array().of(feeValidator),
  keys: yup.array().of(keyValidator),
});
