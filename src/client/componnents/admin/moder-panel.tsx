import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router'
import { useTypeSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import ModerReports from './moder-panel-item/moder-panel-reports'

export default function ModerPanel() {
  const roles = useTypeSelector((state) => state.auth.roles)

  if (!roles.includes('moderator')) {
    return <Navigate to="/login" />
  }

  return (
    <Routes>
      <Route path="/moderpanel/reports">
        <ModerReports />
      </Route>
    </Routes>
  )
}
