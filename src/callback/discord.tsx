import { FC, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useTypeDispatch } from '../redux/hooks'

const Discord: FC = () => {
  const dispatch = useTypeDispatch()

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  // todo need add funk sync disc
  useEffect(() => {
    // void dispatch(
    //   getDiscord({
    //     code: queryString.parse(search).code as string
    //   })
    // )
  }, [dispatch])

  return <Navigate to="/profile" />
}

export default Discord
