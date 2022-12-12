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

import React, { useState, useCallback } from 'react';

export type ModalContentType = HTMLElement | string | React.ReactNode

type ModalContextProps = {
  closeModal: () => void,
  showModal: () => void,
  isModalShowed: boolean,
  modalContent: ModalContentType,
  setModalContent: (el: ModalContentType) => void,
}

export const ModalContext = React.createContext<ModalContextProps>({
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
  const [modalContent, setModalContent] = useState<ModalContentType>(<p>Modal is empty!</p>);

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
