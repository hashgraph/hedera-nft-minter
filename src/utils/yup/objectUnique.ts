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
import filter from 'lodash/filter';
import some from 'lodash/some';

export default function objectUnique() {
  return yup.addMethod(yup.object, 'unique', function (message, arrayValueKey) {
    return this.test('unique', message, (current, context) => {
      if (!current || !current[arrayValueKey]) {
        return true;
      }

      const otherValues = filter(context.parent, (value) => (
        value !== current
      ));

      const isDuplicate = some(otherValues, (value) => (
        current[arrayValueKey] === value[arrayValueKey]
      ));

      return isDuplicate
        ? context.createError({ path: `${ context.path }.${ arrayValueKey }` })
        : true;
    });
  });
}
