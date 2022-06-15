import { NestedRouteConfig } from '@/routes/base'
import Settings from '.'
import Profile from './profile'
import settingsNestedRoutes from './routes'

const SettingsConfig = {
  wrapper: Settings,
  defaultComponent: Profile,
  nestedRoutes: settingsNestedRoutes
} as NestedRouteConfig

export default SettingsConfig
