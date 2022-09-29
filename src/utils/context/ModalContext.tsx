import React, { useState, useCallback } from 'react';

type ModalContentType = HTMLElement | string | React.ReactNode

export const ModalContext = React.createContext<{
  closeModal: () => void;
  showModal: () => void;
  isModalShowed: boolean;
  modalContent: ModalContentType;
  setModalContent: (el: ModalContentType) => void;
}>({
  closeModal: () => undefined,
  showModal: () => undefined,
  isModalShowed: false,
  modalContent: '',
  setModalContent: () => undefined,
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [isModalShowed, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<
    HTMLElement | string | React.ReactNode
  >(<p>Modal is empty!</p>);

  const showModal = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return (
    <ModalContext.Provider
      value={{
        closeModal,
        showModal,
        isModalShowed,
        modalContent,
        setModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
