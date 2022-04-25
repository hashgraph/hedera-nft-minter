import React, { Suspense } from 'react';
import omit from 'lodash/omit';
import { RouteComponentProps } from 'react-router';
import { Route, RouteProps } from 'react-router-dom';


interface WithRouterProps extends RouteProps {
  noBreadcrumbs?: boolean;
  label?: string,
  extra?: (matchProps: RouteComponentProps) => React.ReactNode
}

export default function WithRouter(props: WithRouterProps) {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...omit(rest, 'noBreadcrumbs')}
      exact={rest?.path !== '/404'}
      render={matchProps => (
        <Suspense fallback={<div>loading</div>}>
          {Component && <Component {...matchProps} {...rest} />}
        </Suspense>
      )}
    />
  );
}
