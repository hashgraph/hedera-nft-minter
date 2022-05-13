import * as yup from 'yup';

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

  treasury: yup.mixed().oneOf(['no', 'account', 'custom']).required('Required'),
  kyc: yup.mixed().oneOf(['no', 'account', 'custom']).required('Required'),
  admin: yup.mixed().oneOf(['no', 'account', 'custom']).required('Required'),
  freeze: yup.mixed().oneOf(['no', 'account', 'custom']).required('Required'),
  wipe: yup.mixed().oneOf(['no', 'account', 'custom']).required('Required'),
  supply: yup.mixed().oneOf(['no', 'account', 'custom']).required('Required'),
  treasury_account_id: yup.string().when('treasury', {
    is: 'custom',
    then: (schema) => schema.required('Required'),
  }),
  kyc_key: yup.string().when('kyc', {
    is: 'custom',
    then: (schema) => schema.required('Required'),
  }),
  admin_key: yup.string().when('admin', {
    is: 'custom',
    then: (schema) => schema.required('Required'),
  }),
  freeze_key: yup.string().when('freeze', {
    is: 'custom',
    then: (schema) => schema.required('Required'),
  }),
  wipe_key: yup.string().when('wipe', {
    is: 'custom',
    then: (schema) => schema.required('Required'),
  }),
  pause_key: yup.string().when('pause', {
    is: 'custom',
    then: (schema) => schema.required('Required'),
  }),
  supply_key: yup.string().when('supply', {
    is: 'custom',
    then: (schema) => schema.required('Required'),
  }),

  // fees: yup.mixed().oneOf(['royaltyFee', 'fractionalFee', 'fixedFee']),
});
