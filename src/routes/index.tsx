import React, { Fragment, useMemo } from 'react';
import { JSX } from '@babel/types';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import { Switch } from 'react-router-dom';

import WithRouter from '@hoc/WithRouter';

import { BaseLayout } from '@layout/Base.layout';

import pages, { Route } from '@routes/base';

interface MapProps {
  data: Route[];
}

const MapRoutes = ({ data }: MapProps): JSX.Element => {
  return (
    <Fragment>
      {map(data, (page, i) => (
        <Fragment key={`Fragment_${ i + 1 }`}>
          <WithRouter {...page} />
          {isArray(page.child) && <MapRoutes data={page.child} />}
        </Fragment>
      ))}
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
