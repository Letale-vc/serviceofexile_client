import { FC, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Box, CircularProgress, Container } from '@mui/material'
import AppRouter from './router/AppRouter'
import { useTypeDispatch, useTypeSelector } from './redux/hooks'
import { dataInitialize } from './redux/reducers/dataSlice'
import NavBar from './componnents/navbar/navbar'
import { initializeAuth, loginThunk } from './redux/reducers/authSlice'

const App: FC = () => {
  const [initialize, setInitialize] = useState(false)

  const dispatch = useTypeDispatch()
  const data = useTypeSelector((state) => state.data.data)

  // const statusFetch = useTypeSelector((state) => state.fetchStatus)
  // const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    void dispatch(dataInitialize())

    void dispatch(initializeAuth())
    // if (statusFetch.status && statusFetch.message) {
    //   const variant = statusFetch.status > 204 ? 'error' : 'success'
    //   enqueueSnackbar(statusFetch.message, { variant })
    // }
  }, [dispatch])

  if (data === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <>
      <NavBar />
      <Container
        sx={{
          minWidth: '512px',
          maxWidth: '1520px',
          margin: '0 auto 64px'
        }}
        disableGutters
      >
        <AppRouter />
      </Container>
    </>
  )
}

export default App
