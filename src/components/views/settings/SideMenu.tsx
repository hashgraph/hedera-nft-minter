import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import filter from 'lodash/filter';
import map from 'lodash/map';
import routes from '@routes/base'
import settingsNestedRoutes from '@pages/settings/routes'

export default function SideMenu() {
  const sideMenuLinks = useMemo(() =>
    map(settingsNestedRoutes, route => (
      <Link key={route.path} to={route.path}>{route.title}</Link>
    ))
  , [])

  const mainRoute = useMemo(() =>
    filter(routes, el => el.path === '/settings').map(route =>
      <Link key={route.path} to={route.path}>{route.title}</Link>
    )
  , [])

  return (
    <div className='settings-menu'>
      {mainRoute}
      {sideMenuLinks}
    </div>
  );
}
