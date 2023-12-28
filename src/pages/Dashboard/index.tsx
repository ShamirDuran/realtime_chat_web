import { Stack } from '@mui/material'
import { ActiveChat } from './ActiveChat'
import { Chats } from './Chats'

export const DashboardPage = () => {
  return (
    <Stack direction='row' position='relative'>
      <Chats />
      <ActiveChat />
    </Stack>
  )
}
