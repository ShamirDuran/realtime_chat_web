import { Menu, MenuItem } from '@mui/material'

interface Props {
  menuRef: null | HTMLElement
  isOpen: boolean
  handleClose: () => void
}

export const ActiveMenu = ({ menuRef, isOpen, handleClose }: Props) => {
  const handleContactInfo = () => {
    console.log('Contact info')
  }

  const handleClearChat = () => {
    console.log('Clear chat')
  }

  const handleDeleteChat = () => {
    console.log('Delete chat')
  }

  const handleCloseChat = () => {
    console.log('Close chat')
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
          handleClearChat()
        }}
      >
        Clear chat
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
