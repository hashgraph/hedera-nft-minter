import { MintTypes } from '@utils/entity/MinterWizard'
import ButtonGroup from '@/components/shared/form/button-group'
import { useField } from 'formik'

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
            label: 'NEW COLLECTION NEW NFT',
            value: MintTypes.NewCollectionNewNFT
          },
          {
            label: 'EXISTING COLLECTION NEW NFT',
            value: MintTypes.ExistingCollectionNewNFT
          },
          {
            label: 'EXISTING COLLECTION EXISTING NFT',
            value: MintTypes.ExistingCollectionExistingNFT
          },
        ]}
      />
      <div className='step-buttons-wrapper first-step'>
        <button
          disabled={!value}
          type='button'
          onClick={goToCreator}
        >
          Go to next step
        </button>
      </div>
    </div>

  )
}
