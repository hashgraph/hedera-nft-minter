import { useContext, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ModalContext } from '@/utils/context/ModalContext';
import { useOnClickAway } from 'use-on-click-away';

const Modal = () => {
  const { closeModal, isModalShowed, modalContent } = useContext(ModalContext);
  const ref = useRef(null);

  useEffect(() => {
    const handleExit = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleExit);
    return () => document.removeEventListener('keydown', handleExit);
  }, [closeModal]);

  useOnClickAway(ref, () => {
    closeModal();
  });

  return (
    <CSSTransition
      in={isModalShowed}
      timeout={300}
      classNames='modal'
      unmountOnExit
    >
      <div ref={ref}>
        {modalContent}
        <div className='modal__button-wrapper'>
          <button onClick={closeModal}>Close modal</button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
