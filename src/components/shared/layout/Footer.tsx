import React from 'react';
import BuildOnHederaLogo from '@assets/images/build_on_hedera.svg';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import useLayout from '@utils/hooks/useLayout';

export default function Footer() {
  const location = useLocation();
  const { isMinterWizardWelcomeScreen } = useLayout();

  return (
    <footer className='footer'>
      <CSSTransition
        in={location.pathname === '/' && !isMinterWizardWelcomeScreen}
        timeout={500}
        classNames='fade'
      >
        <img src={BuildOnHederaLogo} alt='hedera_banner' />
      </CSSTransition>
    </footer>
  );
}
