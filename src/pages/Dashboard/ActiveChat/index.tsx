import { Box, Stack } from '@mui/material'
import { useStyles } from '../../../hooks'
import { Header } from './Header'
import { Message } from './Message'
import fakeChat from './data'
import React, { useRef } from 'react'
import { InputMessage } from './InputMessage'

export const ActiveChat = () => {
  const styles = useStyles()
  const scrollRef: React.RefObject<HTMLDivElement> = useRef(null)
  const [messages, setMessages] = React.useState<any>([])

  React.useEffect(() => {
    setMessages(fakeChat(30))

    // weird trick to scroll to bottom on first render
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }, 100)
    }
  }, [])

  return (
    <Stack sx={{ flexGrow: 1, maxHeight: '100vh' }} position='relative'>
      <Header />

      <Box ref={scrollRef} bgcolor='background.paper' pb={10} overflow='auto'>
        <Stack
          flexGrow={1}
          spacing={1.5}
          direction={'column-reverse'}
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
