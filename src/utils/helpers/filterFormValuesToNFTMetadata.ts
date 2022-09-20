import pick from 'lodash/pick';
import reduce from 'lodash/reduce';
import { FormikValues } from 'formik';
import { Attribute, Propertie } from '@utils/entity/NFT-Metadata';

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
    filtered.attributes = reduce(filtered.attributes, (
      res: {[trait_type: string]: string},
      { trait_type, value } : Attribute
    ) => {
      if (value) {
        res[trait_type] = value;
      }

      return res;
    }, {});
  }

  if (!Object.keys(filtered.attributes).length) {
    delete filtered.attributes;
  }

  if (filtered?.properties?.length) {
    filtered.properties = reduce(filtered.properties, (
      res: {[key: string]: string},
      { label, value } : Propertie
    ) => {
      if (value) {
        res[label] = value;
      }

      return res;
    }, {});
  }

  if (!Object.keys(filtered.properties)?.length) {
    delete filtered.properties;
  }

  return filtered
}

export default filterFormValuesToNFTMetadata
