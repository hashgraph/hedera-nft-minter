import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@layout/Hero';

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
        <div className='settings-menu'>
          <Link to={'/settings'}>Settings</Link>
          <Link to={'/settings/profile'}>Profile</Link>
          <Link to={'/settings/notifications'}>Notifications</Link>
        </div>

        {children}
      </div>
    </div>
  )
}
