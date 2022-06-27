import { JSX } from '@babel/types';
import {
  Homepage,
  MyWallet,
  Profile,
  Book,
} from '@/pages';
import settingsConfig from '@routes/settings/config';

export type CommonRoute = {
  path: string;
  icon?: JSX.Element;
  desc?: string;
  title?: string;
  component: () => JSX.Element;
};

type NestedPageComponent = ({ children }: { children: JSX.Element }) => JSX.Element

export type NestedRouteConfig = {
  defaultComponent: () => JSX.Element
  nestedRoutes: Array<CommonRoute | NestedRoute>,
  wrapper: NestedPageComponent,
}

export type NestedRoute = {
  path: string,
  config: NestedRouteConfig,
  title?: string
}

export const instanceOfNestedRouteConfig =
  (data : NestedRouteConfig): data is NestedRouteConfig =>
    'wrapper' in data &&
    'nestedRoutes' in data &&
    'defaultComponent' in data

export const instanceOfNestedRoute =
  (data: NestedRoute | CommonRoute): data is NestedRoute =>
    'path' in data &&
    'config' in data &&
    instanceOfNestedRouteConfig(data.config)

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
  {
    path: '/settings',
    config: settingsConfig,
    title: 'Profile'
  }
];

export default routes;
