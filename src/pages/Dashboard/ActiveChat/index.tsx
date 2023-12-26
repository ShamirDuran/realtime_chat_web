import { Box, Stack } from '@mui/material'
import { useStyles } from '../../../hooks'
import { Header } from './Header'
import { Message } from './Message'
import fakeChat from './data'
import React from 'react'
import { InputMessage } from './InputMessage'

export const ActiveChat = () => {
  const styles = useStyles()
  const [messages, setMessages] = React.useState<any>([])

  React.useEffect(() => {
    setMessages(fakeChat(30))
  }, [])

  return (
    <Stack sx={{ flexGrow: 1, maxHeight: '100vh' }} position='relative'>
      <Header />

      <Box bgcolor='background.paper' pb={10} overflow='auto'>
        <Stack
          direction={'column-reverse'}
          flexGrow={1}
          overflow='auto'
          spacing={1.5}
          sx={{
            py: styles.margin.root.vertical,
            px: styles.margin.root.horizontal,
          }}
        >
          {messages.map(({ id, message, time, from }: any) => (
            <Message key={id} id={id} message={message} time={time} from={from} />
          ))}
        </Stack>
      </Box>

      {/* Send message, attach files */}
      <InputMessage />
    </Stack>
  )
}
