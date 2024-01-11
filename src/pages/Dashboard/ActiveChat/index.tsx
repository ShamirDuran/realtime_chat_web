import { Box, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useStyles } from '../../../hooks'
import { Header } from './Header'
import { InputMessage } from './InputMessage'
import { Message } from './Message'
import fakeChat from './data'

export const ActiveChat = () => {
  const styles = useStyles()
  const scrollRef: React.RefObject<HTMLDivElement> = useRef(null)
  const [messages, setMessages] = useState<any>([])

  useEffect(() => {
    setMessages(fakeChat(0))

    // weird trick to scroll to bottom on first render
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }, 100)
    }
  }, [])

  return (
    <Stack flexGrow={1}>
      <Header />

      <Box ref={scrollRef} flexGrow={1} bgcolor='background.paper' pb={1} overflow='auto'>
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
