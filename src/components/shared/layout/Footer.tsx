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

  const footerLogoAnimationClassnames = useMemo(() => classNames( {
    'fadeslide-left': !(location.pathname === '/' && !isMinterWizardWelcomeScreen),
    'fadeslide-right': location.pathname === '/' && !isMinterWizardWelcomeScreen
  }), [isMinterWizardWelcomeScreen, location.pathname])

  return (
    <footer className='footer container--max-width'>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname === '/' && !isMinterWizardWelcomeScreen ? 'xd' : 'xd2'}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          timeout={500}
          classNames={footerLogoAnimationClassnames}
        >
          {location.pathname === '/' && !isMinterWizardWelcomeScreen
            ? (
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
