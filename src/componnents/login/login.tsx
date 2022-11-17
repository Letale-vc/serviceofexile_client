import { Paper, Box, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypeSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'

export const Login: React.FC = () => {
  const isAuth = useTypeSelector((state: RootState) => state.auth.isAuth)

  const history = useNavigate()

  useEffect(() => {
    if (isAuth === true) {
      history('/main')
    }
  }, [isAuth, history])

  return (
    <Paper>
      <Box display="flex" p={5} sx={{ justifyContent: 'center' }}>
        <Button
          href={`https://www.pathofexile.com/oauth/authorize?client_id=serviceofexile&response_type=code&scope=account:profile&state=${Math.random()}&redirect_uri=https://serviceofexile.com/callback/poe`}
        >
          Sign in with PoE
        </Button>
      </Box>
    </Paper>
  )
}

export default Login
