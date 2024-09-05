import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

/// Used when there is no active chat. it show a lottie animation and a message
export const NoActiveChat = () => {
  const animationRef = useRef<any>(null)

  useEffect(() => {
    lottie.loadAnimation({
      animationData: require('../../../assets/NoActiveChatAnimation.json'),
      autoplay: true,
      container: animationRef.current,
      loop: true,
      renderer: 'svg',
    })

    return () => {
      animationRef.current = null
    }
  }, [])

  return (
    <Stack
      flexGrow={1}
      height='100vh'
      bgcolor='grey.200'
      justifyContent='center'
      alignItems='center'
    >
      <Box height='300px' ref={animationRef} />
      <Typography variant='body2'>Select a chat to start messaging</Typography>
    </Stack>
  )
}
