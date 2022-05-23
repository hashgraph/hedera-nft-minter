import * as yup from 'yup';
import { FEE } from '@utils/entity/Fees';

const feeValidator = yup.object().shape({
  type: yup.string().oneOf(Object.values(FEE))
    .required('Required'),
  feeCollectorAccountId: yup.string().required('Required'),
  fallbackFee: yup.number(),
  numerator: yup.number()
    .required('Required'),
  denominator: yup.number()
    .required('Required'),
  max: yup.number(),
  min: yup.number(),
  assessmentMethod: yup.boolean(),
  amount: yup.number()
    .when('type', {
      is: FEE.FIXED,
      then: yup.number().required('Required'),
    }),
});

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
  fees: yup.array().of(feeValidator)
});
