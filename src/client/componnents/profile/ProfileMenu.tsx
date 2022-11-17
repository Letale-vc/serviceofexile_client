import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { FC, useState } from 'react'
import { useTypeDispatch } from '../../redux/hooks'
import { updatePoeProfileThunk } from '../../redux/reducers/profileSlice'

const MainProfileMenu: FC = () => {
  const dispatch = useTypeDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleOnCloseMenu = () => {
    setAnchorEl(null)
  }

  const updateProfile = () => {
    void dispatch(updatePoeProfileThunk())
    handleOnCloseMenu()
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleOnCloseMenu}
        PaperProps={{
          style: {
            maxHeight: 45 * 4.5
          }
        }}
      >
        <MenuItem onClick={updateProfile}>
          Update profile (character or account name)
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MainProfileMenu
