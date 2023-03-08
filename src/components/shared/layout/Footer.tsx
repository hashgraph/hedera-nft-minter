/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, { useMemo, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import classNames from 'classnames';
import { HomepageContext } from '@utils/context/HomepageContext';
import BuildOnHederaLogo from '@assets/images/build_on_hedera.svg';

export default function Footer() {
  const location = useLocation();
  const { isMinterWizardWelcomeScreen } = useContext(HomepageContext);

  const showLogoOnRightSide = useMemo(() => {
    if (location.pathname === '/') {
      return !isMinterWizardWelcomeScreen
    }

    return true
  }, [location.pathname, isMinterWizardWelcomeScreen])

  const footerLogoAnimationClassnames = useMemo(() => (
    // slide animation is coming from reverse side
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
            <img className='footer__logo' src={BuildOnHederaLogo} alt='build_on_hedera_logo' />
          ) : (
            <img className='footer__logo--left' src={BuildOnHederaLogo} alt='build_on_hedera_logo' />
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
        <div className='footer__links'>
          <Link to='/terms-of-service'>
            Terms of service
          </Link>
        </div>
      </CSSTransition>
    </footer>
  );
}
