import Notifications from './notifications';
import FeaturedItems from './featured-items';
import { NestedRoute, CommonRoute } from '@/routes/base';
import AccountSupport from './account-support';
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
    path: '/settings/account-support',
    component: AccountSupport,
    title: 'Account support'
  },
]

export default settingsNestedRoutes
