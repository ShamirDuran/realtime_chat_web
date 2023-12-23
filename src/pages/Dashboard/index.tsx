import { Stack } from '@mui/material'
import { ActiveChat } from './ActiveChat'
import { Chats } from './Chats'

export const DashboardPage = () => {
  return (
    <Stack direction='row'>
      <Chats />
      <ActiveChat />

      {/* Active sidebar */}
      <></>
    </Stack>
  )
}
