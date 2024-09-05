import AddIcon from '@mui/icons-material/Add'
import SendIcon from '@mui/icons-material/Send'
import EmojiIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { useAppSelector, useStyles } from '../../../hooks'
import { selectAuthUser } from '../../../redux/slices/auth.slice'
import { selectChatState } from '../../../redux/slices/chat.slice'
import { socket } from '../../../socket'

export const InputMessage = () => {
  const [message, setMessage] = useState('')
  const styles = useStyles()
  const chatState = useAppSelector(selectChatState)
  const user = useAppSelector(selectAuthUser)

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.altKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (!message) return

    socket.emit('send_message', {
      content: message,
      chat: chatState.activeChat?.uid,
      from: user?.uid,
      type: 'Text',
    })

    setMessage('')
  }

  return (
    <Stack
      direction='row'
      alignItems='self-end'
      px={styles.margin.root.horizontal}
      py={1}
    >
      <IconButton size='small' sx={{ pb: 1.5 }} disableRipple>
        <AddIcon />
      </IconButton>

      <TextField
        variant='standard'
        value={message}
        multiline
        maxRows={5}
        placeholder='Type a message'
        onScroll={() => {
          console.log('Submitted!')
        }}
        sx={{
          mx: 1.5,
          p: 1,
          backgroundColor: 'background.paper',
          borderRadius: 1,
          '& .MuiInputBase-input': {
            fontSize: 14,
          },
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment
              position='start'
              sx={{
                mb: 1.4,
                alignSelf: 'flex-end',
              }}
            >
              <EmojiIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleChangeMessage}
        onKeyDown={handleKeyPress}
        fullWidth
      />

      <IconButton size='small' sx={{ pb: 1.6 }} onClick={handleSendMessage} disableRipple>
        <SendIcon fontSize='small' />
      </IconButton>
    </Stack>
  )
}
