import React, { useCallback, useMemo } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import pick from 'lodash/pick';
import map from 'lodash/map';
import filter from 'lodash/filter';

import placeholder from '@assets/images/placeholder.png';
import loadingHammer from '@assets/images/loading_hammer.svg';

export default function Processing() {
  const { values } = useFormikContext<FormikValues>();

  const summaryImage = useMemo(() => (
    values?.image ? URL.createObjectURL(values?.image) : placeholder
  ), [values?.image])

  const summaryItemsToRender = useMemo(() => (
    filter(pick(values, [
      'name',
      'symbol',
      'edition_name',
      'creator',
      'description',
    ]), Boolean)
  ), [values])

  const renderSummaryItemList = useCallback(() => (
    map(summaryItemsToRender, (value) => (
      <li key={value}>{value}</li>
    ))
  ), [summaryItemsToRender])

  return (
    <div className='minter-wizard__summary__content'>
      <div>
        <p className='title--small title--strong'>
          Processing...
        </p>
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
  );
}
