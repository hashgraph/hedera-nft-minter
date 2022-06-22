import React from 'react';
import Hero from '@layout/Hero';
import SideMenu from '@components/views/settings/SideMenu';

type Props = {
  children: React.ReactNode;
}

export default function Settings({children} : Props) {

  return (
    <div>
      <Hero title='Settings'>
        This is Settings page
      </Hero>
      <div className='settings'>
        <SideMenu />
        {children}
      </div>
    </div>
  )
}
