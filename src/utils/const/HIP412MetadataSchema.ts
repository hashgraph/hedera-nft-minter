/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { isArray } from 'lodash';
import * as yup from 'yup'

const HIP412MetadataSchema = yup.object().shape({
  name: yup.string().required(),
  creator: yup.string(),
  description: yup.string(),
  image: yup.string().required(),
  type: yup.string().required(),
  format: yup.string(),
  attributes: yup.array().of(
    yup.object().shape({
      trait_type: yup.string().required(),
      value: yup.string().required()
    })
  ),
  localization: yup.object().when('localization', {
    is: (localization: Record<string, unknown>) => !!localization,
    then: yup.object().shape({
      locales: yup.mixed().test('type', 'Only image files are accepted', (value) => {
        if (isArray(value)) {
          return yup.array().of(
            yup.string().required()
          )
        }

        return yup.string().required()
      }),
      default: yup.string().required(),
      uri: yup.string().required()
    })
  })
}, [['localization', 'localization']]);

export default HIP412MetadataSchema
