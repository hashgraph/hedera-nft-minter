import Profile from './profile'
import ProfileNestedRoutes from './profile/routes'
import Notifications from './notifications';
import { NestedRoute, CommonRoute } from '@/routes/base';

const settingsNestedRoutes = [
  {
    path: '/settings/profile',
    wrapper: Profile,
    defaultComponent: <h1>Settings {'->'} Profile</h1>,
    nestedRoutes: ProfileNestedRoutes
  },
  {
    path: '/settings/notifications',
    component: Notifications,
  },
] as Array<NestedRoute | CommonRoute>

export default settingsNestedRoutes
