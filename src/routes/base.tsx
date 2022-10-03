import { JSX } from '@babel/types';
import {
  NotFound,
  Homepage,
  MyWallet,
  TermsOfService,
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
