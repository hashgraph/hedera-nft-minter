import React, { Fragment, useMemo } from 'react';
import { JSX } from '@babel/types';
import map from 'lodash/map';
import { Route, Switch } from 'react-router-dom';

import WithRouter from '@hoc/WithRouter';
import NestedRoute from '@hoc/NestedRoute';

import { BaseLayout } from '@layout/Base.layout';

import pages, {
  CommonRoute,
  NestedRoute as NestedRouteProps,
  instanceOfNestedRoute
} from '@routes/base';

interface MapProps {
  data: Array<CommonRoute | NestedRouteProps>;
}

const MapRoutes = ({ data }: MapProps): JSX.Element => {
  return (
    <Fragment>
      {map(data, (page, i) => (
        instanceOfNestedRoute(page) ? (
          <Route path={page.path}>
            <NestedRoute {...page as NestedRouteProps}/>
          </Route>
        ) : (
          <Fragment key={`Fragment_${ i + 1 }`}>
            <WithRouter {...page as CommonRoute} />
          </Fragment>
        )))}
    </Fragment>
  );
};

function Routes() {
  const routes = useMemo(() => <MapRoutes data={pages} />, []);

  return (
    <BaseLayout>
      <Switch>
        {routes}
      </Switch>
    </BaseLayout>
  );
}

export default Routes;
