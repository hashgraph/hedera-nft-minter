import { useContext, useEffect, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useOnClickAway } from 'use-on-click-away';
import classNames from 'classnames';

import { ModalContext } from '@/utils/context/ModalContext';

const Modal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { closeModal, isModalShowed, modalContent } = useContext(ModalContext);

  useEffect(() => {
    const handleExit = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        enableBodyScroll(ref.current as HTMLDivElement);
      }
    };
    document.addEventListener('keydown', handleExit);
    return () => document.removeEventListener('keydown', handleExit);
  }, [closeModal]);

  useOnClickAway(ref, () => {
    closeModal();
    enableBodyScroll(ref.current as HTMLDivElement);
  });

  const modalBackgroundClassnames = useMemo(
    () =>
      classNames('modal-background', {
        'modal-background__is-showed': isModalShowed,
      }),
    [isModalShowed]
  );

  useEffect(() => {
    if (ref && ref.current) {
      isModalShowed
        ? disableBodyScroll(ref.current as HTMLDivElement)
        : enableBodyScroll(ref.current as HTMLDivElement);
    }
  }, [isModalShowed]);

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
