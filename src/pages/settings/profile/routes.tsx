
import { NestedRoute, CommonRoute } from '@/routes/base';
import GlobalSettings from './global-settings';
import SecondSettings from './second-settings';

const children = [
  {
    path: '/settings/profile/global-settings',
    component: GlobalSettings,
  },
  {
    path: '/settings/profile/second-settings',
    component: SecondSettings,
  },
] as Array<NestedRoute | CommonRoute>

export default children
