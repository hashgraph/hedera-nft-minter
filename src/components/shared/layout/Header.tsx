import { DisconnectOutlined, LoginOutlined } from '@ant-design/icons';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import classNames from 'classnames';
import { Divide as Hamburger } from 'hamburger-react';
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useOnClickAway } from 'use-on-click-away';

import useHederaWallets from '@hooks/useHederaWallets';
import { ModalContext } from '@utils/context/ModalContext';
import useLayout from '@utils/hooks/useLayout';

import ConnectionModal from '@components/shared/modals/ConnectionModal';

import LogoBlack from '@assets/images/black-cutout.svg';
import LogoWhite from '@assets/images/reversed-cutout.svg';

const Header = () => {
  const { connectedWalletType, userWalletId } = useHederaWallets();
  const { showModal, setModalContent } = useContext(ModalContext);
  const { scrollPosition, isNavbarHidden, isMobile } = useLayout();
  const headerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const expandedMenuRef = useRef(null);
  const [isMobileNavbarMenuExpanded, setIsMobileNavbarMenuExpanded] =
    useState(false);

  const handleShowModal = useCallback(() => {
    setModalContent(<ConnectionModal />);
    showModal();
  }, [setModalContent, showModal]);

  const buttonContent = useCallback(
    () =>
      connectedWalletType === 'noconnection' ? (
        <>
          Connect <LoginOutlined />
        </>
      ) : (
        <>
          {userWalletId} <DisconnectOutlined />
        </>
      ),
    [connectedWalletType, userWalletId]
  );

  const isScrolledAboveHeader = useMemo(
    () => headerRef && scrollPosition.y > headerRef?.current?.offsetHeight,
    [scrollPosition, headerRef]
  );

  const isMobileNavbarMenuToogled = useMemo(
    () => isMobile && isMobileNavbarMenuExpanded,
    [isMobile, isMobileNavbarMenuExpanded]
  );

  const hederaLogo = useMemo(
    () =>
      !isMobileNavbarMenuToogled && isScrolledAboveHeader
        ? LogoBlack
        : LogoWhite,
    [isScrolledAboveHeader, isMobileNavbarMenuToogled]
  );

  const headerClassnames = classNames('header', {
    'is-white': isMobile
      ? isScrolledAboveHeader && !isMobileNavbarMenuToogled
      : isScrolledAboveHeader,
    'is-hide': isNavbarHidden,
    'is-mobile': isMobile,
  });
  const logoLinkClassnames = classNames('logo_link', {
    'logo_link__is-white': !isScrolledAboveHeader,
  });
  const buttonsWrapperClassnames = classNames('header__buttons-wrapper', {
    'header__buttons-wrapper__is-white': !isScrolledAboveHeader,
  });
  const mobileNavbarExpandedMenuClassnames = classNames(
    'header__mobile-menu__wrapper',
    {
      'header__mobile-menu__is-hide': !isMobileNavbarMenuToogled,
    }
  );

  const openNavbar = useCallback(() => {
    setIsMobileNavbarMenuExpanded(true);
    disableBodyScroll(headerRef);
  }, [setIsMobileNavbarMenuExpanded]);

  const closeNavbar = useCallback(() => {
    enableBodyScroll(headerRef);
    setIsMobileNavbarMenuExpanded(false);
  }, [setIsMobileNavbarMenuExpanded]);

  const onNavbarToogle = useCallback(
    (toogled) => (toogled ? openNavbar() : closeNavbar()),
    [openNavbar, closeNavbar]
  );

  const mobileNavbar = useCallback(
    () => (
      <>
        <header className={headerClassnames} ref={headerRef}>
          <div className={'header-container'}>
            <Link className={logoLinkClassnames} to='/'>
              <img src={hederaLogo} alt='hedera_logo' height={43} width={43} />{' '}
            </Link>
            <button onClick={handleShowModal}>{buttonContent()}</button>

            <Hamburger
              label='Show menu'
              rounded
              color='#464646'
              size={27}
              toggled={isMobileNavbarMenuToogled}
              toggle={setIsMobileNavbarMenuExpanded}
              onToggle={onNavbarToogle}
            />
          </div>
        </header>

        <div
          className={mobileNavbarExpandedMenuClassnames}
          ref={expandedMenuRef}
        >
          <Link onClick={closeNavbar} to='/'>
            Mint token
          </Link>
          <Link onClick={closeNavbar} to='/my-nft-collection'>
            My NFT Collection
          </Link>
        </div>
      </>
    ),
    [
      onNavbarToogle,
      mobileNavbarExpandedMenuClassnames,
      isMobileNavbarMenuToogled,
      hederaLogo,
      headerClassnames,
      closeNavbar,
      logoLinkClassnames,
      handleShowModal,
      buttonContent,
      setIsMobileNavbarMenuExpanded,
    ]
  );

  const desktopNavbar = useCallback(() => {
    return (
      <header className={headerClassnames} ref={headerRef}>
        <div className={'header-container'}>
          <Link className={logoLinkClassnames} to='/'>
            <img src={hederaLogo} alt='hedera_logo' height={43} width={43} />{' '}
            Hedera
          </Link>
          <div className={buttonsWrapperClassnames}>
            <Link to='/'>Mint token</Link>
            <Link to='/my-nft-collection'>My NFT Collection</Link>
            <button onClick={handleShowModal}>{buttonContent()}</button>
          </div>
        </div>
      </header>
    );
  }, [
    hederaLogo,
    headerClassnames,
    logoLinkClassnames,
    buttonsWrapperClassnames,
    handleShowModal,
    buttonContent,
  ]);

  const renderNavbar = useCallback(
    () => (isMobile ? mobileNavbar() : desktopNavbar()),
    [isMobile, mobileNavbar, desktopNavbar]
  );

  useOnClickAway(expandedMenuRef, () => {
    closeNavbar();
  });

  return renderNavbar();
};

export default Header;
