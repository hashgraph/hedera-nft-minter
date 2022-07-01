import React from 'react';
import FieldWrapper from '@/components/shared/form/FieldWrapper';

export default function OnChain() {
  return (
    <>
      <div>
        <h3 className='minter-wizard__basis-header'>
          How many NFTs do you want to mint in your new collection.
        </h3>
      </div>
      <div className='minter-wizard__on-chain'>
          <FieldWrapper
            fastField
            name='maxSupply'
            type='number'
            label='Max supply'
            tooltip={
              <>
                This is the maximum number of NFTs which can be minted into the collection.
                <span className='flex'>This amount CANNOT be changed in the future</span>
              </>
            }
            min='0'
          />
          <FieldWrapper
            fastField
            name='qty'
            type='number'
            label='Quantity of NFTs'
            tooltip='This is the number of NFTs to mint right now.
                     You can mint 10 at a time until you reach the
                     maximum number of NFTs. All NFTs created will
                     share the same image and metadata properties.'
            max='10'
            min='0'
          />
      </div>
    </>
  );
}
