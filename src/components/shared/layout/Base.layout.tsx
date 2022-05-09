import React, { FC } from 'react';
import Modal from '@components/shared/modal';
import Navbar from '@components/shared/layout/Navbar';

export const BaseLayout: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className=''>
        {children}
        <Modal />
      </main>
    </>
  );
};
