import { NestedRouteConfig } from '@/routes/base'

import {
  SettingsWrapper,
  SettingsProfile,
} from '@/pages'

import nestedRoutes from '@routes/settings'

const settingsConfig : NestedRouteConfig = {
  wrapper: SettingsWrapper,
  defaultComponent: SettingsProfile,
  nestedRoutes: nestedRoutes
}

export default settingsConfig
