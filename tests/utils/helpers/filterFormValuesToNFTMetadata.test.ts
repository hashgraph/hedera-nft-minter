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
      properties: [{ label: 'foo', value: 'bar'}]
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
});
