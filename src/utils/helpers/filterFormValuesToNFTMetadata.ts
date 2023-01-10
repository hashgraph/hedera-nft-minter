/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import pick from 'lodash/pick';
import reduce from 'lodash/reduce';
import { FormikValues } from 'formik';
import { Attribute, Propertie } from '@utils/entity/NFT-Metadata';

const reduceAttributes = (attributes: Attribute[]) => (
  reduce(attributes, (
    res: {[key: string] : string}[],
    { trait_type, value } : Attribute
  ) => {
    if (trait_type && value) {
      res.push({trait_type, value})
    }

    return res
  }, [])
)

const reduceProperties = (properties: Propertie[]) => (
  reduce(properties, (
    res: {[key: string] : string},
    { label, value } : Propertie
  ) => {
    if (label && value) {
      res[label] = value
    }

    return res
  }, {})
)

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

  filtered.format = 'HIP412@1.0.0';

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
    filtered.attributes = reduceAttributes(filtered.attributes)
  }

  if (!Object.keys(filtered?.attributes ?? [])?.length) {
    delete filtered.attributes;
  }

  if (filtered?.properties?.length) {
    filtered.properties = reduceProperties(filtered.properties);
  }

  if (!Object.keys(filtered?.properties ?? [])?.length) {
    delete filtered.properties;
  }

  return filtered
}

export default filterFormValuesToNFTMetadata
