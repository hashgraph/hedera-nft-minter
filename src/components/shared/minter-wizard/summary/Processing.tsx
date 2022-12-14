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

import React, { useCallback, useMemo } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import pick from 'lodash/pick';
import map from 'lodash/map';
import filter from 'lodash/filter';

import Scrollbar from '@components/shared/layout/Scrollbar';
import placeholder from '@assets/images/placeholder.png';
import loadingHammer from '@assets/images/loading_hammer.svg';

export default function Processing() {
  const { values } = useFormikContext<FormikValues>();

  const summaryImage = useMemo(() => (
    values?.image ? URL.createObjectURL(values?.image) : placeholder
  ), [values?.image])

  const renderSummaryItemList = useCallback(() => (
    map(
      filter(pick(values, [
        'name',
        'symbol',
        'edition_name',
        'creator',
        'description',
      ]), Boolean),
      (value) => <li key={value}>{value}</li>
    )
  ), [values])

  return (
    <Scrollbar
      renderOn={{
        laptop: false,
        desktop: false,
        desktopWide: false,
        desktopExtraWide: false,
      }}
    >
      <div className='minter-wizard__summary__content minter-wizard__summary__content--processing'>
        <div>
          <p className='title--small title--strong'>Processing...</p>
          <div className='minter-wizard__summary__image'>
            <img src={summaryImage} alt='Thumb' />
            <ul className='minter-wizard__summary__item-list'>
              {renderSummaryItemList()}
            </ul>
          </div>
        </div>
        <div className='minter-wizard__summary__loader'>
          <img src={loadingHammer} alt='loader_hammer' />
          <p className='title title--small title--strong'>
            Minting <br />
            in progress...
          </p>
        </div>
      </div>
    </Scrollbar>
  );
}
