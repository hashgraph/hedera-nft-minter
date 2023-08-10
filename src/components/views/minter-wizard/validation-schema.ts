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

import * as yup from 'yup';
import { FEE } from '@utils/entity/Fees';
import { MintTypes } from '@utils/entity/MinterWizard';
import validateQtyFormField from '@utils/helpers/validateQtyFormField';
import objectUnique from '@utils/yup/objectUnique';

// 4 Megabytes = 4.194.304 Bytes
const MAX_FILE_LIMIT_IN_BYTES = 4_194_304

objectUnique();

const feeValidator = yup.object().shape({
  type: yup.string()
    .oneOf(Object.values(FEE), 'Select a type')
    .ensure(),
  feeCollectorAccountId: yup.string().when(['type'], {
    is: (type : FEE) => type === FEE.ROYALTY,
    then: yup.string().required('Required'),
  }),
  percent: yup.number().when(['type'], {
    is: (type : FEE) => type === FEE.ROYALTY,
    then: yup.number().min(1, 'Min 1%').max(100, 'Max 100%').required('Required'),
  }),
  fallbackFee: yup.number().when(['type'], {
    is: (type : FEE) => type === FEE.ROYALTY,
    then: yup.number().min(1, 'Min 1')
  }),
  amount: yup.number().when(['type'], {
    is: (type : FEE) => type === FEE.FIXED,
    then: yup.number().min(1, 'Min 1').required('Required')
  })
});

const keyValidator = yup.object().shape({
  type: yup.string()
    .required('Required'),
  value: yup.string().oneOf(['custom', 'account'])
    .required('Required'),
  key: yup.string()
    .when('value', {
      is: 'custom',
      then: yup.string().required('Required')
    })
})

export const ValidationSchema = yup.object().shape({
  image: yup.mixed().test('type', 'Only image files are accepted', (value) => {
    switch (typeof value) {
      case 'object':
        return value ? value?.type?.includes('image/') : true;
      case 'string':
        return true
    }
  }).test('size', 'Max file size = 4MB', (value) => (
    value ? (
      value?.size < MAX_FILE_LIMIT_IN_BYTES
    ) : (
      true
    )
  )).required('Required'),
  name: yup
    .string()
    .max(100, 'Too Long')
    .required('Required'),
  edition_name: yup
    .string()
    .required('Required')
    .max(100, 'Too Long'),
  symbol: yup
    .string()
    .max(100, 'Too Long')
    .required('Required'),
  creator: yup.string().max(100, 'Too Long'),
  description: yup.string().max(1000, 'Too Long'),
  qty: yup
    .number()
    .min(1, 'Min 1')
    .required('Required')
    .when('mint_type', {
      is: (mintType: MintTypes) => mintType === MintTypes.ExistingCollectionNewNFT,
      then: (schema) => schema.when('leftToMint', (leftToMint, schema) => (
        validateQtyFormField(leftToMint, schema)
      )),
      otherwise: (schema) => schema.when('maxSupply', (maxSupply, schema) => (
        validateQtyFormField(maxSupply, schema))
      )
    }
  ),
  maxSupply: yup
    .number()
    .when(['mint_type'], {
      is: (mintType : string) => mintType === MintTypes.NewCollectionNewNFT,
      then: (schema) => schema.min(1, 'Min 1').required('Required'),
      otherwise: (schema) => schema
  }),
  properties: yup.array().of(
    yup
      .object()
      .shape(
        {
          label: yup
            .string()
            .max(100, 'Too Long')
            .when(['value'], {
              is: (value: string) => !!value,
              then: (schema) => schema.required('Required'),
            }),
          value: yup
            .string()
            .max(100, 'Too Long')
            .when(['label'], {
              is: (label: string) => !!label,
              then: (schema) => schema.required('Required'),
            }),
        },
        [['label', 'value']]
      )
      .unique('Label must be unique', 'label')
  ),

  token_id: yup.string().when(['mint_type'], {
    is: (mintType: MintTypes) => MintTypes.ExistingCollectionNewNFT === mintType,
    then: yup.string().required('Required'),
  }),
  attributes: yup.array().of(
    yup
      .object()
      .shape(
        {
          trait_type: yup.string().max(100, 'Too Long'),
          value: yup
            .string()
            .max(100, 'Too Long')
            .when(['trait_type'], {
              is: (trait_type: string) => !!trait_type,
              then: (schema) => schema.required('Required'),
            }),
        },
        [['trait_type', 'value']]
      )
      .unique('Trait type must be unique', 'trait_type')
  ),
  fees: yup.array().of(feeValidator),
  // keys: yup.array().of(keyValidator),
  treasuryAccountId: yup.array().of(keyValidator),
});
