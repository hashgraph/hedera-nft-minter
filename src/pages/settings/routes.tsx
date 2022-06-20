import Notifications from './notifications';
import { NestedRoute, CommonRoute } from '@/routes/base';

const settingsNestedRoutes : Array<NestedRoute | CommonRoute> = [
  {
    path: '/settings/notifications',
    component: Notifications,
  },
]

export default settingsNestedRoutes
