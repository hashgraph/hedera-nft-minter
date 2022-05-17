import { useContext, useEffect, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ModalContext } from '@/utils/context/ModalContext';
import { useOnClickAway } from 'use-on-click-away';
import classNames from 'classnames';

const Modal = () => {
  const ref = useRef(null);
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

  useOnClickAway(ref, () => {
    closeModal();
  });

  const modalBackgroundClassnames = useMemo(
    () =>
      classNames('modal-background', {
        'is-modal-background-showed': isModalShowed,
      }),
    [isModalShowed]
  );

  return (
    <>
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
      <div className={modalBackgroundClassnames} />
    </>
  );
};

export default Modal;
