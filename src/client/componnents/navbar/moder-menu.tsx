import { Button, Menu, MenuItem } from '@mui/material'
import * as React from 'react'

import { useNavigate } from 'react-router-dom'

const NavBarModerMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const history = useNavigate()
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button onClick={handleClick}>modpanel</Button>
      <Menu
        id="long-menu moderpanel"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 45 * 4.5
          }
        }}
      >
        <MenuItem
          onClick={() => {
            history('/moderpanel/reports')
            handleClose()
          }}
        >
          Модерация репортов
        </MenuItem>
        <MenuItem
          onClick={() => {
            history('/moderpanel/tftvouchrequest')
            handleClose()
          }}
        >
          Запросы на добавления тфт воучей
        </MenuItem>
      </Menu>
    </>
  )
}

export default NavBarModerMenu
