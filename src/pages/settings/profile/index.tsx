import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
}

export default function Profile({children} : Props) {
  return (
    <div>
      <div className='settings-profile'>
        <div className='settings-profile-menu'>
          <Link to={'/settings/profile/global-settings'}>Global settings</Link>
          <Link to={'/settings/profile/second-settings'}>Second settings</Link>
        </div>

        {children}
      </div>
    </div>
  )
}
