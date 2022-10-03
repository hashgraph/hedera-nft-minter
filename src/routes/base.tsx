import { JSX } from '@babel/types';
import {
  NotFound,
  Homepage,
  MyWallet,
  NFTOverview
  // Profile,
  // Book,
} from '@/pages';

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
  // {
  //   path: '/profile',
  //   component: Profile,
  // },
  // {
  //   path: '/book',
  //   component: Book,
  // },
  // {
  //   path: '/settings',
  //   config: settingsConfig,
  //   title: 'Profile'
  // },
  {
    path: '/nft-overview/:collectionId/:serialNumber',
    component: NFTOverview,
  },
  {
    path: '/404',
    component: NotFound,
  },
];

export default routes;
