import { RouteProps } from 'react-router-dom'
import Discord from '../callback/discord'
import Poe from '../callback/poe'
import AdminPanel from '../componnents/admin/admin-panel'
import ModerPanel from '../componnents/admin/moder-panel'
import Faq from '../componnents/faq/faq'
import Login from '../componnents/login/login'
import Main from '../componnents/main/main'
import Profile from '../componnents/profile/Profile'
import PublicProfile from '../componnents/public-profile/public-profile'
import Report from '../componnents/report/report'

// const Report = lazy(() => import('./componnents/report/report'))
// const ModerPanel = lazy(() => import('./componnents/admin/moder-panel'))
// const AdminPanel = lazy(() => import('./componnents/admin/admin-panel'))

export enum RouteNames {
  MAIN = '/main',
  PROFILE = '/profile',
  PROFILEPUBLIC = '/public/:accountName',
  DISCORD_CALL_BACK = '/callback/discord',
  POE_CALL_BACK = '/callback/poe',
  FAQ = '/faq',
  LOGIN = '/login',
  REPORT = '/report',
  MODER_PANEL = '/moderpanel',
  ADMIN_PANEL = '/adminpanel'
}
export const publicRoutes = [
  { path: RouteNames.MAIN, element: Main },
  { path: RouteNames.PROFILEPUBLIC, element: PublicProfile },
  { path: RouteNames.FAQ, element: Faq },
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.POE_CALL_BACK, element: Poe }
]
export const privateRoutes = [
  { path: RouteNames.PROFILE, element: Profile },
  { path: RouteNames.DISCORD_CALL_BACK, element: Discord },
  { path: RouteNames.REPORT, element: Report },
  { path: RouteNames.MODER_PANEL, element: ModerPanel },
  { path: RouteNames.ADMIN_PANEL, element: AdminPanel }
]
