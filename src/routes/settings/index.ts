import {
  SettingsNotifications,
  SettingsFeaturedItems,
  SettingsAccountSupport,
  SettingsOffers
} from '@/pages'


const settingsNestedRoutes = [
  {
    path: '/settings/featured-items',
    component: SettingsFeaturedItems,
    title: 'Featured items'
  },
  {
    path: '/settings/notifications',
    component: SettingsNotifications,
    title: 'Notifications'
  },
  {
    path: '/settings/offers',
    component: SettingsOffers,
    title: 'Offers'
  },
  {
    path: '/settings/account-support',
    component: SettingsAccountSupport,
    title: 'Account support'
  },
]

export default settingsNestedRoutes
