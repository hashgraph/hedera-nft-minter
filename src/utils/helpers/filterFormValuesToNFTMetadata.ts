import pick from 'lodash/pick';
import { FormikValues } from 'formik';

const filterFormValuesToNFTMetadata = (values : FormikValues) => {
  let filtred = pick(values, [
    'name',
    'type',
    'creator',
    'creatorDID',
    'description',
    'image',
    'files',
    'format',
    'attributes',
  ]) as FormikValues;

  filtred.format = 'opensea';

  filtred = Object.keys(filtred).reduce(
    (params: FormikValues, paramName: string) => {
      if (
        (!Array.isArray(filtred[paramName]) && filtred[paramName]) ||
        (Array.isArray(filtred[paramName]) && filtred[paramName].length > 0)
      ) {
        params[paramName] = filtred[paramName];
      }

      return params;
    },
    {}
  );

  return filtred
}

export default filterFormValuesToNFTMetadata
