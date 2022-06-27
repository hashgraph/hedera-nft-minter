import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import filter from 'lodash/filter';
import routes from '@routes/base'

export default function SideMenu() {
  const mainRoute = useMemo(() =>
    filter(routes, el => el.path === '/settings').map(route =>
      <Link key={route.path} to={route.path}>{route.title}</Link>
    )
  , [])

  return (
    <div className='settings-menu'>
      {mainRoute}
      <Link to='/settings/notifications'>Notifications</Link>
      <Link to='/settings/featured-items'>Featured items</Link>
      <Link to='/settings/offers'>Offers</Link>
      <Link to='/settings/account-support'>Account support</Link>
    </div>
  );
}
