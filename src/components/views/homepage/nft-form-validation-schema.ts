import * as yup from 'yup';

export const ValidationSchema = yup.object().shape({
  image: yup.mixed().required('Image is required'),
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
  creator: yup
    .string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  creatorDID: yup
    .string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: yup
    .string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  qty: yup.number().min(1, 'Min 1!').required('Required'),
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
});
