import React, { useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ModalContext } from '@/utils/context/ModalContext';

const Modal = () => {
  const { closeModal, isModalShowed, modalContent } = useContext(ModalContext);

  useEffect(() => {
    const handleExit = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleExit);
    return () => document.removeEventListener('keydown', handleExit);
  }, [closeModal]);

  return (
    <CSSTransition
      in={isModalShowed}
      timeout={300}
      classNames='modal'
      unmountOnExit
    >
      <div>
        {modalContent}
        <div className='modal__button-wrapper'>
          <button onClick={closeModal}>Close modal</button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
