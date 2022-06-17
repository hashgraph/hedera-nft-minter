import { useEffect } from 'react'
import { FormikState, useField, useFormikContext } from 'formik'
import { MintTypes } from '@utils/entity/MinterWizard'
import { initialValues, WizardValues } from '@/utils/const/minter-wizard';
import ButtonGroup from '@/components/shared/form/button-group'

type Props = {
  goToCreator: () => void
}

export default function Welcome({goToCreator} : Props) {
  const [{ value }] = useField('mint_type')
  const { resetForm } = useFormikContext<WizardValues>()

  useEffect(() => {
    resetForm({values: {...initialValues, mint_type: value}} as Partial<FormikState<WizardValues>>)
  },[resetForm, value])

  return (
    <div className='minter-wizard__step__creator'>
      <h2>What do you want to mint?</h2>
      <ButtonGroup
        size='big'
        square
        name='mint_type'
        options={[
          {
            label: 'New NFT',
            value: MintTypes.NewCollectionNewNFT
          },
          {
            label: 'New NFT <span class="flex">with Existing Collection</span>',
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
