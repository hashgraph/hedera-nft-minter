import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import classNames from 'classnames';
import BuildOnHederaLogo from '@assets/images/build_on_hedera.svg';
import useLayout from '@utils/hooks/useLayout';

export default function Footer() {
  const location = useLocation();
  const { isMinterWizardWelcomeScreen } = useLayout();

  const showLogoOnRightSide = useMemo(() => {
    switch (location.pathname) {
      case '/':
        return !isMinterWizardWelcomeScreen

      case '/my-nft-collection':
        return true;

      case '/terms-of-service':
        return true;

      default:
        return false
    }
  }, [location.pathname, isMinterWizardWelcomeScreen])

  const footerLogoAnimationClassnames = useMemo(() => (
    classNames(`fadeslide${ showLogoOnRightSide ? '-left' : '-right' }`)
  ), [showLogoOnRightSide])

  return (
    <footer className='footer'>
      <SwitchTransition>
        <CSSTransition
          key={showLogoOnRightSide ? 'right' : 'left'}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          timeout={500}
          classNames={footerLogoAnimationClassnames}
        >
          {showLogoOnRightSide ? (
            <a className='footer__logo' href='https://hedera.com' target='_blank'>
              <img src={BuildOnHederaLogo} alt='build_on_hedera_logo' />{' '}
            </a>
          ) : (
            <a className='footer__logo--left' href='https://hedera.com' target='_blank'>
              <img src={BuildOnHederaLogo} alt='build_on_hedera_logo' />{' '}
            </a>
          )}
        </CSSTransition>
      </SwitchTransition>

      <CSSTransition
        in={!showLogoOnRightSide}
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        timeout={700}
        classNames='fade'
        unmountOnExit
      >
        <div className='footer__tos'>
          <Link to='/terms-of-service'>
            Terms of service
          </Link>
        </div>
      </CSSTransition>
    </footer>
  );
}
