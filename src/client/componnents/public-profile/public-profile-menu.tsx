import { IconButton, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'

interface PropsType {
  accountProfile?: string
}

const PublicProfileMenu: React.FC<PropsType> = ({ accountProfile }) => {
  const history = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const redirectReport = () => {
    history(`/report?accountName=${accountProfile}`)
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
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 45 * 4.5,
            width: '20ch'
          }
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            redirectReport()
          }}
        >
          Report
        </MenuItem>
      </Menu>
    </div>
  )
}

export default PublicProfileMenu
