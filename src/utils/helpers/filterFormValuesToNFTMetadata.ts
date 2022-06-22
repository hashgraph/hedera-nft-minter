import pick from 'lodash/pick';
import { FormikValues } from 'formik';

const filterFormValuesToNFTMetadata = (values : FormikValues) => {
  let filtered = pick(values, [
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

  filtered.format = 'opensea';

  filtered = Object.keys(filtered).reduce(
    (params: FormikValues, paramName: string) => {
      if (
        (!Array.isArray(filtered[paramName]) && filtered[paramName]) ||
        (Array.isArray(filtered[paramName]) && filtered[paramName].length > 0)
      ) {
        params[paramName] = filtered[paramName];
      }

      return params;
    },
    {}
  );

  return filtered
}

export default filterFormValuesToNFTMetadata
