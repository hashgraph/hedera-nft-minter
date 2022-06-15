import Notifications from './notifications';
import { NestedRoute, CommonRoute } from '@/routes/base';

const settingsNestedRoutes = [
  {
    path: '/settings/notifications',
    component: Notifications,
  },
] as Array<NestedRoute | CommonRoute>

export default settingsNestedRoutes
