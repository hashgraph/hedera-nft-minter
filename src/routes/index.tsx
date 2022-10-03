import React, { Suspense } from 'react';
import map from 'lodash/map';
import omit from 'lodash/omit';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BaseLayout } from '@layout/Base.layout';

import pages from '@routes/base';

function Routes() {
  return (
    <BaseLayout>
      <Switch>
        {map(pages, (page) => (
          <Route
            {...omit({ ...page }, 'noBreadcrumbs')}
            exact={page?.path === '/'}
            render={matchProps => (
              <Suspense fallback={<div>loading</div>}>
                {page.component && <page.component {...matchProps} {...page} />}
              </Suspense>
            )}
          />
        ))}

        <Redirect from='*' to='/404' />
      </Switch>
    </BaseLayout>
  );
}

export default Routes;
