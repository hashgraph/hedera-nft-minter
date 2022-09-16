import React from 'react';
import FieldWrapper from '@/components/shared/form/FieldWrapper';

export default function OnChain() {

  return (
    <div className='minter-wizard__on-chain'>
      <div>
        <p className='title title--small'>
          How many NFTs do you want
          to mint in your new collection?
        </p>
      </div>
      <div className='minter-wizard__on-chain__wrapper'>
        <div className='minter-wizard__on-chain__input-row'>
          <label htmlFor='maxSupply' className='title--strong title--medium'>
            # of <br />
            NFTs to <br />
            mint now:
          </label>
          <FieldWrapper
            fastField
            name='qty'
            type='number'
            tooltip='This is the number of NFTs to mint right now.
              You can mint 10 at a time until you reach the
              maximum number of NFTs. All NFTs created will
              share the same image and metadata properties.'
            min='0'
            max='10'
            maxLength={2}
          />
        </div>
        <div className='minter-wizard__on-chain__input-row'>
          <label htmlFor='qty' className='title--strong title--medium'>
            Maximum <br />
            Total Supply:
          </label>
          <FieldWrapper
            fastField
            name='maxSupply'
            type='number'
            maxLength={6}
            tooltip={
              <>
                This is the maximum number of NFTs which can be minted into the collection.
                <span className='flex'>This amount CANNOT be changed in the future</span>
              </>
            }
            min='0'
          />
        </div>
      </div>
    </div>
  );
}
