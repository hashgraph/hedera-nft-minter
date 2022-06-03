import { FC } from 'react';
import { JSX } from '@babel/types';

import {
  Homepage,
  MyWallet,
  Profile,
  Book,
} from '@/pages';

export type Route = {
  path: string;
  icon?: JSX.Element;
  desc?: string;
  child?: Route[],
  component: FC;
};

const routes: Route[] = [
  {
    path: '/',
    component: Homepage,
  },
  {
    path: '/my-nft-collection',
    component: MyWallet,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/book',
    component: Book,
  }
];

export default routes;
