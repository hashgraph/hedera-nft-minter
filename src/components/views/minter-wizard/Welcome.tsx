import { useField } from 'formik'
import { MintTypes } from '@utils/entity/MinterWizard'
import ButtonGroup from '@/components/shared/form/button-group'

type Props = {
  goToCreator: () => void
}

export default function Welcome({goToCreator} : Props) {
  const [{ value }] = useField('mint_type')

  return (
    <div className='minter-wizard__step__creator'>
      <h2>What do you want to mint?</h2>
      <ButtonGroup
        size='big'
        square
        name='mint_type'
        options={[
          {
            label: <>New NFT <span className='flex'>in New Collection</span></>,
            value: MintTypes.NewCollectionNewNFT
          },
          {
            label: <>New NFT <span className='flex'>in Existing Collection</span></>,
            value: MintTypes.ExistingCollectionNewNFT
          },
          // {
          //   label: 'EXISTING COLLECTION EXISTING NFT',
          //   value: MintTypes.ExistingCollectionExistingNFT
          // },
        ]}
      />
      <div className='step-buttons-wrapper first-step'>
        <button
          disabled={!value}
          type='button'
          onClick={goToCreator}
        >
          Start minting
        </button>
      </div>
    </div>

  )
}
