import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ModalContext } from '@/utils/context/ModalContext';

const Modal = () => {
  const { closeModal, isModalShowed, modalContent } = useContext(ModalContext);

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
