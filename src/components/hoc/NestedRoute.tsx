import React from 'react';
import { Route, Switch } from 'react-router-dom';
import map from 'lodash/map';
import { instanceOfNestedRoute, NestedRoute as NestedRouteProps } from '@/routes/base';

export default function NestedRoute({
  path,
  defaultComponent,
  nestedRoutes,
  wrapper: Wrapper
}: NestedRouteProps) {

  return (
    <Wrapper>
      <Switch>
        {map(nestedRoutes, route =>
          instanceOfNestedRoute(route) ? (
            <NestedRoute {...route} />
          ) : (
            <Route path={route.path} >
              <route.component />
            </Route>
        ))}
        <Route exact path={path}>
          {defaultComponent}
        </Route>
      </Switch>
    </Wrapper>
  )
}
