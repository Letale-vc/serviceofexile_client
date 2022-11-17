import { FC, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useTypeDispatch } from '../redux/hooks'
import { loginThunk } from '../redux/reducers/authSlice'

const Poe: FC = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  const dispatch = useTypeDispatch()
  const query = useQuery()
  useEffect(() => {
    console.log(query.get('code'))
    if (query.get('code')) {
      void dispatch(loginThunk(query.get('code')))
    }
  }, [dispatch, query])

  return <Navigate to="/" />
}

export default Poe
