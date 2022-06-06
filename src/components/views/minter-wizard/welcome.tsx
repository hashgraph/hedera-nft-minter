import { MintTypes } from '@utils/entity/MinterWizard'
import ButtonGroup from '@/components/shared/form/button-group'

export default function Welcome() {
  return (
    <div className='minter-wizard__step__container'>
      <div className='minter-wizard__step__creator'>
        <ButtonGroup
          name='mint_type'
          options={[
            {
              label: 'New collection new NFT',
              value: MintTypes.NewCollectionNewNFT
            },
            {
              label: 'Existing collection new NFT',
              value: MintTypes.ExistingCollectionNewNFT
            },
            {
              label: 'Existing collection existing NFT',
              value: MintTypes.ExistingCollectionExistingNFT
            },
          ]}
        />
      </div>
    </div>

  )
}
