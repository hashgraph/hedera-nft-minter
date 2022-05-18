import React, { FC } from 'react';
import Modal from '@components/shared/modal';
import Header from '@/components/shared/layout/Header';

export const BaseLayout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className=''>
        {children}
        <Modal />
      </main>
    </>
  );
};
