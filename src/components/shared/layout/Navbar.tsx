import { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ProfileTwoTone } from '@ant-design/icons';
import { ModalContext } from '@utils/context/ModalContext';
import ConnectionModal from '@components/shared/modals/ConnectionModal';

const Navbar = () => {
  const { showModal, setModalContent } = useContext(ModalContext);

  const handleShowModal = useCallback(() => {
    setModalContent(<ConnectionModal />);
    showModal();
  }, [setModalContent, showModal]);

  return (
    <header>
      <Link className='logo_link' to='/'>
        <h1>NFT Minter</h1>
      </Link>

      <div className='header__buttons-wrapper'>
        <Link to='/my-wallet'>My Wallet</Link>
        <button onClick={handleShowModal}>
          <ProfileTwoTone />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
