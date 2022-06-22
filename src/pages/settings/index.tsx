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
          <Link to={'/settings'}>Profile</Link>
          <Link to={'/settings/featured-items'}>Featured items</Link>
          <Link to={'/settings/notifications'}>Notifications</Link>
          <Link to={'/settings/offers'}>Offers</Link>
          <Link to={'/settings/payment'}>Payment</Link>
          <Link to={'/settings/account-support'}>Account support</Link>
          <Link to={'/settings/earnings'}>Earnings</Link>

        </div>

        {children}
      </div>
    </div>
  )
}
