import { Menu, MenuItem } from '@mui/material'

interface Props {
  menuRef: null | HTMLElement
  isOpen: boolean
  handleClose: () => void
}

export const MainMenu = ({ menuRef, isOpen, handleClose }: Props) => {
  const handleSettings = () => {
    console.log('Settings')
  }

  const handleLogOut = () => {
    console.log('Log Out')
  }

  return (
    <Menu id='basic-menu' anchorEl={menuRef} open={isOpen} onClose={() => handleClose()}>
      <MenuItem
        onClick={() => {
          handleClose()
          handleSettings()
        }}
      >
        Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose()
          handleLogOut()
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  )
}
