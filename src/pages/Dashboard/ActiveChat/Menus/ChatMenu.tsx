import { Menu, MenuItem } from '@mui/material'
import { useAppDispatch } from '../../../../hooks'
import { setActiveChat } from '../../../../redux/slices/chat.slice'

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
    dispatch(setActiveChat({ chat: null }))
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
