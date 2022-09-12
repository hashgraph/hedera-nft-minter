import { MintTypes } from '@utils/entity/MinterWizard'
import ButtonGroup from '@/components/shared/form/button-group'
import Scrollbar from '@components/shared/layout/Scrollbar'

type Props = {
  goToCreator: () => void,
}

export default function Welcome({ goToCreator }: Props) {
  return (
    <div className='minter-wizard__step minter-wizard__welcome minter-wizard__animation-container'>
      <Scrollbar>
        <div className='minter-wizard__step__wrapper minter-wizard__welcome__container'>
          <h1 className='title title--welcome'>
            Start minting <br />
            your NFT here:
          </h1>
          <ButtonGroup
            direction='column'
            name='mint_type'
            options={[
              {
                label: <>New Collection</>,
                value: MintTypes.NewCollectionNewNFT,
                onClick: goToCreator,
                renderArrow: true
              },
              {
                label: <>Existing Collection</>,
                value: MintTypes.ExistingCollectionNewNFT,
                tooltip: <>Some tooltip information</>,
                onClick: goToCreator,
                renderArrow: true
              },
            ]}
          />
          <div className='minter-wizard__slogan'>
            <h2>
              fastest. <br />
              easiest. <br />
              most sustainable.
            </h2>
          </div>
        </div>
      </Scrollbar>
    </div>
  )
}
