import { Menu, MenuItem } from '@mui/material'
import { useAppDispatch } from '../../../../hooks'
import { setActiveUserChat } from '../../../../redux/slices/ui.slice'

interface Props {
  menuRef: null | HTMLElement
  isOpen: boolean
  handleClose: () => void
}

export const ChatMenu = ({ menuRef, isOpen, handleClose }: Props) => {
  const dispatch = useAppDispatch()

  const handleContactInfo = () => {
    console.log('Contact info')
  }

  const handleDeleteChat = () => {
    console.log('Delete chat')
  }

  const handleCloseChat = () => {
    dispatch(setActiveUserChat({ user: null }))
  }

  return (
    <Menu id='basic-menu' anchorEl={menuRef} open={isOpen} onClose={() => handleClose()}>
      <MenuItem
        onClick={() => {
          handleClose()
          handleContactInfo()
        }}
      >
        Contact info
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose()
          handleCloseChat()
        }}
      >
        Close chat
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose()
          handleDeleteChat()
        }}
      >
        Delete chat
      </MenuItem>
    </Menu>
  )
}
