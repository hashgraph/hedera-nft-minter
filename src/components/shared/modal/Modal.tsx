import React, { useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useOnClickAway } from 'use-on-click-away';
import classNames from 'classnames';

import { ModalContext } from '@/utils/context/ModalContext';

type Props = {
  closeModal: () => void;
  isModalShowed: boolean;
  children: React.ReactNode;
}

const Modal = ({ children, ...props } : Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const modalContext = useContext(ModalContext);
  const [modalContent, setModalContent] = useState(children)

  const closeModal = useCallback(() => (
    props.closeModal ? props.closeModal() : modalContext.closeModal()
  ), [modalContext, props])

  const isModalShowed = useMemo(() => (
    props.isModalShowed ?? modalContext.isModalShowed
  ), [modalContext.isModalShowed, props.isModalShowed])

  useEffect(() => {
    setModalContent(children ?? modalContext.modalContent)
  }, [children, modalContext.modalContent])

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
