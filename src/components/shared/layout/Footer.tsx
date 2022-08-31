import React from 'react';
import BuildOnHederaLogo from '@assets/images/build_on_hedera.svg';
import { useLocation } from 'react-router-dom';
import useLayout from "@utils/hooks/useLayout";

export default function Footer() {
  const location = useLocation()
  const {isMinterWizardWelcomeScreen} = useLayout()

  return (
    <footer className='footer'>
      {location.pathname === '/' && !isMinterWizardWelcomeScreen && (
        <img src={BuildOnHederaLogo} alt='hedera_banner'/>
      )}
    </footer>
  )
}
