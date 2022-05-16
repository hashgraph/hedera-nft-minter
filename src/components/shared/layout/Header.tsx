import React, {
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import { LoginOutlined, DisconnectOutlined } from '@ant-design/icons';
import { ModalContext } from '@utils/context/ModalContext';
import ConnectionModal from '@components/shared/modals/ConnectionModal';
import useHederaWallets from '@hooks/useHederaWallets';
import LogoBlack from '@assets/images/black-cutout.svg';
import LogoWhite from '@assets/images/reversed-cutout.svg';
import classNames from 'classnames';

const Header = () => {
  const { connectedWalletType, userWalletId } = useHederaWallets();
  const { showModal, setModalContent } = useContext(ModalContext);
  const [scrolledAboveHeader, setScrolledAboveHeader] = useState(false);
  const headerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

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

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef) {
        if (window.scrollY > headerRef.current.offsetHeight) {
          setScrolledAboveHeader(true);
        } else {
          setScrolledAboveHeader(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hederaLogo = useMemo(
    () => (scrolledAboveHeader ? LogoBlack : LogoWhite),
    [scrolledAboveHeader]
  );

  const headerClassnames = classNames({
    'is-white': scrolledAboveHeader,
  });
  const logoLinkClassnames = classNames({
    'logo_link': true,
    'logo_link__is-white': !scrolledAboveHeader,
  });
  const buttonsWrapperClassnames = classNames({
    'header__buttons-wrapper': true,
    'header__buttons-wrapper__is-white': !scrolledAboveHeader,
  });

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
};

export default Header;
