import { useSelector } from 'react-redux'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import { RouteNames } from './Router'
import { RootState } from '../redux/store'
import { FC } from 'react'
import Main from '../componnents/main/main'
import PublicProfile from '../componnents/public-profile/public-profile'
import Faq from '../componnents/faq/faq'
import { Login, Report } from '@mui/icons-material'
import Poe from '../callback/poe'
import Discord from '../callback/discord'
import AdminPanel from '../componnents/admin/admin-panel'
import ModerPanel from '../componnents/admin/moder-panel'
import Profile from '../componnents/profile/Profile'

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  if (!isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />
  }

  return children
}

const AppRouter: FC = () => {
  const publicRoutes = useRoutes([
    { path: RouteNames.MAIN, element: <Main /> },
    { path: RouteNames.PROFILEPUBLIC, element: <PublicProfile /> },
    { path: RouteNames.FAQ, element: <Faq /> },
    { path: RouteNames.LOGIN, element: <Login /> },
    { path: RouteNames.POE_CALL_BACK, element: <Poe /> }
  ])

  const privateRoutes = useRoutes([
    { path: RouteNames.MAIN, element: <Main /> },
    { path: RouteNames.PROFILEPUBLIC, element: <PublicProfile /> },
    { path: RouteNames.FAQ, element: <Faq /> },
    { path: RouteNames.LOGIN, element: <Login /> },
    { path: RouteNames.POE_CALL_BACK, element: <Poe /> },
    {
      path: RouteNames.PROFILE,
      element: (
        <RequireAuth>
          <Profile />
        </RequireAuth>
      )
    },
    {
      path: RouteNames.DISCORD_CALL_BACK,
      element: (
        <RequireAuth>
          <Discord />
        </RequireAuth>
      )
    },
    {
      path: RouteNames.REPORT,
      element: (
        <RequireAuth>
          <Report />
        </RequireAuth>
      )
    },
    {
      path: RouteNames.MODER_PANEL,
      element: (
        <RequireAuth>
          <ModerPanel />
        </RequireAuth>
      )
    },
    {
      path: RouteNames.ADMIN_PANEL,
      element: (
        <RequireAuth>
          <AdminPanel />
        </RequireAuth>
      )
    }
  ])

  return privateRoutes
}

export default AppRouter
