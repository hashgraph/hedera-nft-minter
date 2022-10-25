/** @jest-environment jsdom */
import React from 'react';
import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import MyNFTCollection from '@pages/my-nft-collection';

describe('MyNFTCollection', () => {
  it('render', () => {

    render(
      <MyNFTCollection />
    )
  })

});
