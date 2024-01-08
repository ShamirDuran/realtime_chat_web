import { Menu, MenuItem } from '@mui/material'
import { useAppDispatch } from '../../../../hooks'
import { logout } from '../../../../redux/slices/auth.slice'
import { useNavigate } from 'react-router-dom'

interface Props {
  menuRef: null | HTMLElement
  isOpen: boolean
  handleClose: () => void
}

export const MainMenu = ({ menuRef, isOpen, handleClose }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSettings = () => {
    console.log('Settings')
  }

  const handleLogOut = () => {
    dispatch(logout())
    navigate('/auth/login')
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
          handleLogOut()
          handleClose()
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  )
}
