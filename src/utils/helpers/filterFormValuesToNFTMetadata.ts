import pick from 'lodash/pick';
import { FormikValues } from 'formik';

const filterFormValuesToNFTMetadata = (values : FormikValues) => {
  let filtered = pick(values, [
    'type',
    'creator',
    'description',
    'image',
    'files',
    'format',
    'attributes',
    'properties',
  ]) as FormikValues;

  filtered.name = values.edition_name

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

  if (filtered?.attributes?.length) {
    filtered.attributes = filtered.attributes.reduce((res, { label, value }) => {
      if (value) {
        res[label] = value;
      }

      return res;
    }, {});
  }

  if (!filtered.attributes.length) {
    delete filtered.attributes;
  }

  if (filtered?.properties?.length) {
    filtered.properties = filtered.properties.reduce((res, { label, value }) => {
      if (value) {
        res[label] = value;
      }

      return res;
    }, {});
  }

  if (!filtered.properties.length) {
    delete filtered.properties;
  }

  return filtered
}

export default filterFormValuesToNFTMetadata
