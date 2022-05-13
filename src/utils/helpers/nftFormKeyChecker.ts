import { FormikValues } from 'formik';

export const keyChecker = (values: FormikValues, key: string) => {
  switch (values[key]) {
    case 'custom':
      return values[`${ key }_key`];
    case 'account':
      return 'account_key';
    default:
      break;
  }
};
