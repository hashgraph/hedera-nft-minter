/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
                    <page.component {...matchProps} {...page} />
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
