import { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ProfileTwoTone } from '@ant-design/icons';
import { ModalContext } from '@utils/context/ModalContext';
import ConnectionModal from '@components/shared/modals/ConnectionModal';
import useHederaWallets from '@hooks/useHederaWallets';
import Logo from '@assets/images/hedera_logomark.png';

const Navbar = () => {
  const { connectedWalletType, userWalletId } = useHederaWallets();
  const { showModal, setModalContent } = useContext(ModalContext);

  const handleShowModal = useCallback(() => {
    setModalContent(<ConnectionModal />);
    showModal();
  }, [setModalContent, showModal]);

  return (
    <header>
      <Link className='logo_link' to='/'>
        <img src={Logo} alt='hedera_logo' height={30} width={30} /> Hedera
      </Link>

      <div className='header__buttons-wrapper'>
        <Link to='/my-wallet'>My NFT Collection</Link>
        <button onClick={handleShowModal}>
          {connectedWalletType === 'noconnection' ? 'Connect' : userWalletId}{' '}
          <ProfileTwoTone />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
