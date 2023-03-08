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

import {  enableBodyScroll } from 'body-scroll-lock';
import classNames from 'classnames';
import { Divide as Hamburger } from 'hamburger-react';
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOnClickAway } from 'use-on-click-away';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import CSSTransition from 'react-transition-group/CSSTransition';

import { ModalContext } from '@utils/context/ModalContext';
import { HomepageContext } from '@utils/context/HomepageContext';
import useHederaWallets, { ConnectionStateType } from '@hooks/useHederaWallets';
import useLayout from '@utils/hooks/useLayout';

import ConnectionModal from '@components/shared/modals/ConnectionModal';

import Logo from '@assets/images/logo.svg';
import ConnectIcon from '@assets/images/icons/connect.svg'
import ProfileIcon from '@assets/images/icons/profile.svg'

const Header = () => {
  const { connectedWalletType, userWalletId } = useHederaWallets();
  const { showModal, setModalContent } = useContext(ModalContext);
  const { isMobileSmall } = useLayout();
  const { resetHomepageData, isMinterWizardWelcomeScreen } = useContext(HomepageContext);
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const expandedMenuRef = useRef(null);
  const [isMobileNavbarMenuExpanded, setIsMobileNavbarMenuExpanded] =
    useState(false);

  const handleShowModal = useCallback(() => {
    setModalContent(<ConnectionModal />);
    showModal();
  }, [setModalContent, showModal]);

  const isMobileNavbarMenuToogled = useMemo(() => (
    isMobileSmall && isMobileNavbarMenuExpanded
  ), [isMobileSmall, isMobileNavbarMenuExpanded]);

  const headerClassnames = classNames('header', {
    'header--shade': location.pathname === '/' && isMinterWizardWelcomeScreen,
    'is-mobile': isMobileSmall,
  });

  const mobileNavbarExpandedMenuClassnames = classNames(
    'header__mobile-menu__wrapper',
    {
      'header__mobile-menu__is-hide': !isMobileNavbarMenuToogled,
    }
  );

  const connectIconClassName = classNames('icon__connect', {
    'icon--active': connectedWalletType !== ConnectionStateType.NOCONNECTION
  })

  const closeNavbar = useCallback(() => {
    if (headerRef?.current) {
      enableBodyScroll(headerRef.current);
      setIsMobileNavbarMenuExpanded(false);
    }
  }, [setIsMobileNavbarMenuExpanded]);

  useOnClickAway(headerRef, () => {
    closeNavbar();
  });

  const handleLogoClick = useCallback(() => (
    location.pathname === '/'
      ? resetHomepageData()
      : null
  ), [location.pathname, resetHomepageData])

  return (
    <header className={headerClassnames} ref={headerRef}>
      <div className={classNames('header-container', 'container--padding')}>
        <Link onClick={handleLogoClick} className='header__logo' to='/'>
          <img src={Logo} alt='hedera_logo' height={66} width={110} />{' '}
        </Link>
        {!isMobileSmall ? (
            <div className='header__buttons-wrapper'>
              <Link to='/my-nft-collection' className='icon__profile'>
                <img src={ProfileIcon} alt='profile_icon' />
                <p>
                  My NFT <br />
                  Collection
                </p>
              </Link>

              <button onClick={handleShowModal} className={connectIconClassName}>
                <img src={ConnectIcon} alt='wallet_connect_icon' />
                <div>
                  <SwitchTransition>
                    <CSSTransition
                      key={connectedWalletType}
                      addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
                      classNames='fade'
                    >
                      <div>
                        {connectedWalletType === ConnectionStateType.NOCONNECTION ? (
                          <>
                            Connect <br />
                            Wallet
                          </>
                        ) : (
                          <>
                            Connected <br />
                            {userWalletId}
                          </>
                        )}
                      </div>
                    </CSSTransition>
                  </SwitchTransition>
                </div>
              </button>
            </div>
          ) : (
            <Hamburger
              label='Show menu'
              rounded
              color='#464646'
              size={27}
              toggled={isMobileNavbarMenuToogled}
              toggle={setIsMobileNavbarMenuExpanded}
            />
          )
        }
      </div>
      {isMobileSmall && (
        <div
          className={mobileNavbarExpandedMenuClassnames}
          ref={expandedMenuRef}
        >
          <Link onClick={closeNavbar} to='/'>
            Mint NFT
          </Link>
          <Link onClick={closeNavbar} to='/my-nft-collection'>
            My NFT Collection
          </Link>
          <button onClick={handleShowModal}>
              {connectedWalletType === ConnectionStateType.NOCONNECTION ? (
                'Connect Wallet'
              ) : (
                `Connected ${ userWalletId }`
              )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
