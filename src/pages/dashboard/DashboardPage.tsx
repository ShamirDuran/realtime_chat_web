import { Stack } from '@mui/material'
import { Chats } from './Chats'
import { ActiveChat } from './ActiveChat'

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
