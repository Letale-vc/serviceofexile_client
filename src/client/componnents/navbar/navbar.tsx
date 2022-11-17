import { FC, useEffect } from 'react'
import NavBarModerMenu from './moder-menu'
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  ButtonGroup,
  Button,
  SvgIcon,
  Typography
} from '@mui/material'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import { mdiDiscord } from '@mdi/js'
import { useTypeDispatch, useTypeSelector } from '../../redux/hooks'
import { dataInitialize } from '../../redux/reducers/dataSlice'

const NavBar: FC = () => {
  const dispatch = useTypeDispatch()
  const isAuth = useTypeSelector((state) => state.auth.isAuth)
  const roles = useTypeSelector((state) => state.auth.roles)
  const accountName = useTypeSelector((state) => state.auth.accountName)

  const history = useNavigate()

  const logout = () => {}

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="lg">
        <Toolbar sx={{ minHeight: '45px' }}>
          <Box flexGrow={1}>
            <ButtonGroup
              size="small"
              aria-label="vertical contained button group"
              variant="text"
            >
              <Button onClick={() => history('/main')}>
                <HomeIcon />
              </Button>

              {isAuth && (
                <>
                  <Button onClick={() => history('/profile')}>Profile</Button>
                  <Button onClick={() => history('/report')}>Report</Button>
                </>
              )}

              <Button onClick={() => history('/faq')}>faq</Button>

              {roles.includes('moder') && (
                <>
                  <NavBarModerMenu />
                  <Button onClick={() => history('/adminpanel')}>
                    adminpanel
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Box>
          <Button
            href="https://discord.gg/b4UfWreAAs"
            target="_blank"
            sx={{ marginRight: 15 }}
            startIcon={
              <SvgIcon>
                <path d={mdiDiscord} />
              </SvgIcon>
            }
          >
            feedback
          </Button>
          {!isAuth ? (
            <Button href="https://www.pathofexile.com/oauth/authorize?client_id=serviceofexile&response_type=code&scope=account:profile%20account:characters&state=SERVICE-AUTH-STATE&redirect_uri=https://serviceofexile.com/callback/poe">
              Sign in with PoE
            </Button>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ marginRight: 2 }}>
                Logged in as:{' '}
                <Link
                  // component={NavLink}
                  // sx={{
                  //   '&:hover': {
                  //     cursor: 'pointer',
                  //     color: amber[300],
                  //   },
                  // }}
                  // underline="none"
                  to="/profile"
                >
                  {accountName}
                </Link>
              </Typography>
              <Button onClick={logout}>Log out</Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
