import EmojiIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/Add'
import { Stack, TextField, InputAdornment, IconButton } from '@mui/material'
import { useState } from 'react'
import { useStyles } from '../../../hooks'

export const InputMessage = () => {
  const [message, setMessage] = useState('')
  const styles = useStyles()

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
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
        fullWidth
      />

      <IconButton size='small' sx={{ pb: 1.6 }} disableRipple>
        <SendIcon fontSize='small' />
      </IconButton>
    </Stack>
  )
}
