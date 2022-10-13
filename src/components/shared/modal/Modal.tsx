/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, { useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useOnClickAway } from 'use-on-click-away';
import classNames from 'classnames';

import { ModalContext } from '@utils/context/ModalContext';

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
      if (ref.current && e.key === 'Escape') {
        closeModal();
        enableBodyScroll(ref.current);
      }
    };

    document.addEventListener('keydown', handleExit);
    return () => document.removeEventListener('keydown', handleExit);
  }, [closeModal]);

  useOnClickAway(ref, () => {
    closeModal();

    if (ref.current) {
      enableBodyScroll(ref.current);
    }
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
        ? disableBodyScroll(ref.current)
        : enableBodyScroll(ref.current);
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
