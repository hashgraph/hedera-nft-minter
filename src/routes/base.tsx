import { FC } from 'react';
import { JSX } from '@babel/types';

import {
  Homepage
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
];

export default routes;
