/** @jest-environment jsdom */
import React from 'react';
import { describe, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import CollectionList from '@components/views/my-nft-collection/CollectionList';

describe('CollectionList', () => {
  it('render', () => {
    const fn = jest.fn(v => v);

    render(
      <CollectionList
        collections={[]}
        selectedCollectionsId={[]}
        setSelectedCollectionsId={fn}
      />
    )
  })

});
