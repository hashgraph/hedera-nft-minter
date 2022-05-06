import { useContext, useCallback } from 'react';
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
      <h1>NFT Minter</h1>
      <button onClick={handleShowModal}>
        <ProfileTwoTone />
      </button>
    </header>
  );
};

export default Navbar;
