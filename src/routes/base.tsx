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

import { JSX } from '@babel/types';
import {
  NotFound,
  Homepage,
  MyWallet,
  TermsOfService,
} from '@pages/index';

export type CommonRoute = {
  path: string;
  icon?: JSX.Element;
  desc?: string;
  title?: string;
  component: () => JSX.Element;
};

const routes: Array<CommonRoute> = [
  {
    path: '/',
    component: Homepage,
  },
  {
    path: '/my-nft-collection',
    component: MyWallet,
  },
  {
    path: '/terms-of-service',
    component: TermsOfService,
  },
{
    path: '/404',
    component: NotFound,
  },
];

export default routes;
