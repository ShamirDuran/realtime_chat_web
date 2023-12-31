import { Stack } from '@mui/material'
import { ActiveChat } from './ActiveChat'
import { Chats } from './Chats'
import { ProfileDrawer } from './components/ProfileDrawer'

export const DashboardPage = () => {
  return (
    <Stack direction='row' position='relative'>
      <Chats />
      <ActiveChat />

      <ProfileDrawer />
    </Stack>
  )
}
