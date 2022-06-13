import { JSX } from '@babel/types';

import {
  Homepage,
  MyWallet,
  Profile,
  Book
} from '@/pages';

export type CommonRoute = {
  path: string;
  icon?: JSX.Element;
  desc?: string;
  component: () => JSX.Element;
};

type NestedPageComponent = ({ children }: { children: JSX.Element }) => JSX.Element

export type NestedRoute = {
  path: string,
  defaultComponent: JSX.Element
  nestedRoutes: Array<CommonRoute | NestedRoute>,
  wrapper: NestedPageComponent
}

export const instanceOfNestedRoute =
  (data: NestedRoute | CommonRoute): data is NestedRoute =>
    'nestedRoutes' in data &&
    'path' in data &&
    'defaultComponent' in data &&
    'wrapper' in data

const routes: Array<CommonRoute | NestedRoute> = [
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
  },
];

export default routes;
