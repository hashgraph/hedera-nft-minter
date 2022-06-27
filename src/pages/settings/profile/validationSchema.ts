import * as yup from 'yup';

export const ValidationSchema = yup.object().shape({
  avatar: yup.mixed().test('type', 'Only image files are accepted!', (value) => {
    switch (typeof value) {
      case 'object':
        return value ? value?.type?.includes('image/') : true;
      case 'string':
        return true
    }
  }),
  banner: yup.mixed().test('type', 'Only image files are accepted!', (value) => {
    switch (typeof value) {
      case 'object':
        return value ? value?.type?.includes('image/') : true;
      case 'string':
        return true
    }
  }),
  username: yup
    .string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!'),
  email: yup.string().email('Not valid email!'),
  bio: yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
  social_links: yup.array().of(
    yup.object().shape({
      type: yup
        .string()
        .oneOf(['facebook', 'twitter', 'instagram']),
      value: yup
        .string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!'),
    })
  ),
});
