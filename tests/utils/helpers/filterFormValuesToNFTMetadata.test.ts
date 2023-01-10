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

import { describe, it, expect } from '@jest/globals';
import filterFormValuesToNFTMetadata from '@utils/helpers/filterFormValuesToNFTMetadata';

describe('Filter form values to metadata', () => {
  it('empty values', () => {
    expect(filterFormValuesToNFTMetadata({})).toEqual({format: 'HIP412@1.0.0'});
  });

  it('correct metadata', () => {
    const values = {
      edition_name: 'Test',
      description: 'lorem ipsum',
      type: 'image/jpeg',
      image: 'ipfs://bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm',
      creator: 'Tester',
      attributes: [{ trait_type: 'height', value: 10 }],
      properties: { foo: 'bar' }
    };

    expect(filterFormValuesToNFTMetadata({...values, files: ''}))
      .toEqual({
        name: 'Test',
        description: 'lorem ipsum',
        type: 'image/jpeg',
        image: 'ipfs://bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm',
        creator: 'Tester',
        format: 'HIP412@1.0.0',
        attributes: [{ trait_type: 'height', value: 10 }],
        properties: [{ label: 'foo', value: 'bar'}],
      });
  });

  it('correct metadata - empty attributes & properties', () => {
    const values = {
      edition_name: 'Test',
      description: 'lorem ipsum',
      type: 'image/jpeg',
      image: 'ipfs://bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm',
      creator: 'Tester',
      attributes: [],
      properties: []
    };

    expect(filterFormValuesToNFTMetadata({...values, files: ''}))
      .toEqual({
        name: 'Test',
        description: 'lorem ipsum',
        type: 'image/jpeg',
        image: 'ipfs://bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm',
        creator: 'Tester',
        format: 'HIP412@1.0.0',
      });
  })

  it('correct metadata', () => {
    const values = {
      edition_name: 'Test',
      description: 'lorem ipsum',
      type: 'image/jpeg',
      image: 'ipfs://bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm',
      creator: 'Tester',
      attributes: [ { trait_type: 'foo', value: 'bar'} ],
      properties: { foo: 'bar' }
    };

    expect(filterFormValuesToNFTMetadata({...values, files: ''}))
      .toEqual({
        name: 'Test',
        description: 'lorem ipsum',
        type: 'image/jpeg',
        image: 'ipfs://bafkreiahrxk5xvmuqn2jmpaj2oemm777fazloc43ltxnsivzwigxy4cyjm',
        creator: 'Tester',
        format: 'HIP412@1.0.0',
        attributes: [ { trait_type: 'foo', value: 'bar'} ],
        properties: { foo: 'bar' }
      });
  })
});
