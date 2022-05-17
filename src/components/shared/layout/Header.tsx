import React, {
  useContext,
  useCallback,
  useRef,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { LoginOutlined, DisconnectOutlined } from '@ant-design/icons';
import { ModalContext } from '@utils/context/ModalContext';
import ConnectionModal from '@components/shared/modals/ConnectionModal';
import useHederaWallets from '@hooks/useHederaWallets';
import LogoBlack from '@assets/images/black-cutout.svg';
import LogoWhite from '@assets/images/reversed-cutout.svg';
import classNames from 'classnames';
import useLayout from '@utils/hooks/useLayout';
import { Divide as Hamburger } from 'hamburger-react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const Header = () => {
  const { connectedWalletType, userWalletId } = useHederaWallets();
  const { showModal, setModalContent } = useContext(ModalContext);
  const { scrollPosition, isNavbarHidden, isMobile } = useLayout();
  const headerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
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

  const scrolledAboveHeader = useMemo(
    () => headerRef && scrollPosition.y > headerRef?.current?.offsetHeight,
    [scrollPosition, headerRef]
  );

  const isMobileNavbarMenuToogled = useMemo(
    () => isMobile && isMobileNavbarMenuExpanded,
    [isMobile, isMobileNavbarMenuExpanded]
  );

  const hederaLogo = useMemo(
    () =>
      isMobileNavbarMenuToogled
        ? LogoWhite
        : scrolledAboveHeader
        ? LogoBlack
        : LogoWhite,
    [scrolledAboveHeader, isMobileNavbarMenuToogled]
  );

  const headerClassnames = classNames({
    'header': true,
    'is-white': isMobile
      ? scrolledAboveHeader && !isMobileNavbarMenuToogled
      : scrolledAboveHeader,
    'is-hide': isNavbarHidden,
    'is-mobile': isMobile,
  });
  const logoLinkClassnames = classNames({
    'logo_link': true,
    'logo_link__is-white': !scrolledAboveHeader,
  });
  const buttonsWrapperClassnames = classNames({
    'header__buttons-wrapper': true,
    'header__buttons-wrapper__is-white': !scrolledAboveHeader,
  });
  const mobileNavbarExpandedMenuClassnames = classNames({
    'header__mobile-menu__wrapper': true,
    'header__mobile-menu__is-hide': !isMobileNavbarMenuToogled,
  });

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
          <div className={'container'}>
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

        <div className={mobileNavbarExpandedMenuClassnames}>
          <Link onClick={closeNavbar} to='/'>
            Mint token
          </Link>
          <Link onClick={closeNavbar} to='/my-wallet'>
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
        <div className={'container'}>
          <Link className={logoLinkClassnames} to='/'>
            <img src={hederaLogo} alt='hedera_logo' height={43} width={43} />{' '}
            Hedera
          </Link>
          <div className={buttonsWrapperClassnames}>
            <Link to='/'>Mint token</Link>
            <Link to='/my-wallet'>My NFT Collection</Link>
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

  return renderNavbar();
};

export default Header;
