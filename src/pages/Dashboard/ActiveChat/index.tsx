import { Box, Stack } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useAppSelector, useStyles } from '../../../hooks'
import { selectChatState } from '../../../redux/slices/chat.slice'
import { Header } from './Header'
import { InputMessage } from './InputMessage'
import { Message } from './Message'

export const ActiveChat = () => {
  const styles = useStyles()
  const scrollRef: React.RefObject<HTMLDivElement> = useRef(null)
  const messages = useAppSelector(selectChatState).activeChat?.messages || []

  const scrollToEnd = () => {
    // weird trick to scroll to bottom on first render
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }, 100)
    }
  }

  useEffect(() => {
    scrollToEnd()
  }, [messages])

  return (
    <Stack flexGrow={1}>
      <Header />

      <Box ref={scrollRef} flexGrow={1} bgcolor='background.paper' pb={1} overflow='auto'>
        <Stack
          flexGrow={1}
          direction='column-reverse'
          spacing={1.5}
          sx={{
            py: styles.margin.root.vertical,
            px: styles.margin.root.horizontal,
          }}
        >
          {messages.map((message) => (
            <Message key={message.uid} message={message} />
          ))}
        </Stack>
      </Box>

      {/* Send message, attach files */}
      <InputMessage />
    </Stack>
  )
}
