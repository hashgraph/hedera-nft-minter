import { MintTypes } from '@utils/entity/MinterWizard'
import ButtonGroup from '@/components/shared/form/button-group'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { useEffect } from 'react';
import BuildOnHederaLogo from '@assets/images/build_on_hedera.svg';

type Props = {
  goToCreator: () => void,
  isActive: boolean
}

export default function Welcome({goToCreator, isActive} : Props) {
  return (
    // <CSSTransition
    //   in={isActive}
    //   timeout={500}
    //   classNames='fade'
    // >
      <div className='minter-wizard__step minter-wizard__screen--welcome minter-wizard__animation-container container--padding'>
        <div className='minter-wizard__step__wrapper minter-wizard__screen--welcome'>
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
            <a href='http://hedera.com' target='_blank'>
              <img src={BuildOnHederaLogo} alt='build_on_hedera_logo' height={76} width={170} />{' '}
            </a>

          </div>
        </div>
      </div>
    // </CSSTransition>
  )
}
