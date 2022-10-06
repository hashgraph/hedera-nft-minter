import React, { Suspense } from 'react';
import map from 'lodash/map';
import omit from 'lodash/omit';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import { BaseLayout } from '@layout/Base.layout';
import pages from '@routes/base';

function Routes() {
  const location = useLocation();

  return (
    <BaseLayout>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames='fade'
          timeout={500}
        >
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
        </CSSTransition>
      </TransitionGroup>
    </BaseLayout>
  );
}

export default Routes;
