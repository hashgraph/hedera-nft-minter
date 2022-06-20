import { NestedRouteConfig } from '@/routes/base'
import Settings from '.'
import Profile from './profile'
import settingsNestedRoutes from './routes'

const SettingsConfig : NestedRouteConfig = {
  wrapper: Settings,
  defaultComponent: Profile,
  nestedRoutes: settingsNestedRoutes
}

export default SettingsConfig
