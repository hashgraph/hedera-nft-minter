import Notifications from './notifications';
import FeaturedItems from './featured-items';
import { NestedRoute, CommonRoute } from '@/routes/base';
import Earnings from './earnings';
import AccountSupport from './account-support';
import Payment from './payment';
import Offers from './offers';

const settingsNestedRoutes : Array<NestedRoute | CommonRoute> = [
  {
    path: '/settings/featured-items',
    component: FeaturedItems,
  },
  {
    path: '/settings/notifications',
    component: Notifications,
  },
  {
    path: '/settings/offers',
    component: Offers,
  },
  {
    path: '/settings/payment',
    component: Payment,
  },
  {
    path: '/settings/account-support',
    component: AccountSupport,
  },
  {
    path: '/settings/earnings',
    component: Earnings,
  },
]

export default settingsNestedRoutes
