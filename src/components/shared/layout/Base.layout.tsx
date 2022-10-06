import React, { FC } from 'react';
import Modal from '@components/shared/modal';
import Header from '@/components/shared/layout/Header';
import Footer from '@/components/shared/layout/Footer';

export const BaseLayout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className='dark-schema container--min-height'>
        {children}
        <Modal />
      </main>
      <Footer />
    </>
  );
};
