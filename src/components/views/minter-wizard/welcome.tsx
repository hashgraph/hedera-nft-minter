import { MintTypes } from '@components/views/minter-wizard'
import FieldRadio from '@/components/shared/form/FieldRadio'

export default function Welcome() {
  return (
    <div className='minter-wizard__step__container'>
      <div className='minter-wizard__step__creator'>
        <fieldset>
          <legend>What you want to mint?</legend>
          <FieldRadio
            name='mint_type'
            value={MintTypes.NewCollectionNewNFT}
            label='New collection new NFT'
          />
          <FieldRadio
            name='mint_type'
            value={MintTypes.ExistingCollectionNewNFT}
            label='Existing collection new NFT'
          />
          <FieldRadio
            name='mint_type'
            value={MintTypes.ExistingCollectionExistingNFT}
            label='Existing collection existing NFT'
          />
        </fieldset>
      </div>
    </div>

  )
}
