import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import classNames from 'classnames';
import BuildOnHederaLogo from '@assets/images/build_on_hedera.svg';
import useLayout from '@utils/hooks/useLayout';

export default function Footer() {
  const location = useLocation();
  const { isMinterWizardWelcomeScreen } = useLayout();

  const isHomeScreenLogoLeft = useMemo(() => (
    location.pathname === '/' && !isMinterWizardWelcomeScreen
  ), [location.pathname, isMinterWizardWelcomeScreen])

  const isMyNFTCollectionScreen = useMemo(() => (
    location.pathname === '/my-nft-collection'
  ), [location.pathname])

  const showLogoOnLeft = useMemo(() => (
    isMyNFTCollectionScreen ? (
      isMyNFTCollectionScreen
    ) : (
      isHomeScreenLogoLeft
    )
  ), [isHomeScreenLogoLeft, isMyNFTCollectionScreen])

  const footerLogoAnimationClassnames = useMemo(() => classNames( {
    'fadeslide-left': !showLogoOnLeft,
    'fadeslide-right': showLogoOnLeft
  }), [showLogoOnLeft])

  return (
    <footer className='footer container--max-width'>
      <SwitchTransition>
        <CSSTransition
          key={showLogoOnLeft ? 'left' : 'right'}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          timeout={500}
          classNames={footerLogoAnimationClassnames}
        >
          {showLogoOnLeft ? (
            <a className='footer__logo' href='http://hedera.com' target='_blank'>
              <img src={BuildOnHederaLogo} alt='build_on_hedera_logo' />{' '}
            </a>
          ) : (
            <a className='footer__logo--left' href='http://hedera.com' target='_blank'>
              <img src={BuildOnHederaLogo} alt='build_on_hedera_logo' />{' '}
            </a>
          )}
        </CSSTransition>
      </SwitchTransition>
    </footer>
  );
}
