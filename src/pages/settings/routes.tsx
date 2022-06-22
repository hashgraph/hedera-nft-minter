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
    title: 'Featured items'
  },
  {
    path: '/settings/notifications',
    component: Notifications,
    title: 'Notifications'
  },
  {
    path: '/settings/offers',
    component: Offers,
    title: 'Offers'
  },
  {
    path: '/settings/payment',
    component: Payment,
    title: 'Payment'
  },
  {
    path: '/settings/account-support',
    component: AccountSupport,
    title: 'Account support'
  },
  {
    path: '/settings/earnings',
    component: Earnings,
    title: 'Earnings'
  },
]

export default settingsNestedRoutes
