import styled from '@emotion/styled'
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Icon,
  useTheme
} from '@mui/material'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTypeDispatch, useTypeSelector } from '../../redux/hooks'
import { getProfileThunk } from '../../redux/reducers/profileSlice'
import MainProfileMenu from './ProfileMenu'
import ProfileServices from './ProfileServices'

const Span = styled('span')(() => ({
  color: '#fff8e1'
}))

const Profile: FC = () => {
  const theme = useTheme()
  const profile = useTypeSelector((state) => state.user.profile)
  const status = useTypeSelector((state) => state.user.status)
  const dispatch = useTypeDispatch()

  useEffect(() => {
    if (profile === null) {
      void dispatch(getProfileThunk())
    }
  }, [profile, dispatch])

  if (status === 'loading') {
    return (
      <Box display="flex" pt={10} justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Paper sx={{ paddingTop: 1 }}>
        <Box>
          <MainProfileMenu />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(
              2
            )} ${theme.spacing(2)}`
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              {profile?.accountName}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                Character name: <Span>{profile?.characterName}</Span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography>
                Discord: <Span>{profile?.discord}</Span>
              </Typography>{' '}
              <Link
                // sx={{ marginLeft: 2, lineHeight: 0 }}
                to="https://discord.com/api/oauth2/authorize?client_id=784172939779768350&redirect_uri=https%3A%2F%2Fserviceofexile.com%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email"
              >
                <Icon>link</Icon>
              </Link>
            </Box>
            <Typography>
              Vouch: <Span>{profile?.vouches.vouches_all_count}</Span>
            </Typography>
          </Box>
          {!profile?.characterName ? (
            <Box marginLeft={3}>
              {' '}
              <Typography variant="h5" color="error">
                Update character name
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Paper>
      {profile ? <ProfileServices profile={profile} /> : null}
    </Box>
  )
}
export default Profile
