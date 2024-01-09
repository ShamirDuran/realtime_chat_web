import { Stack } from '@mui/material'
import { ActiveChat } from './ActiveChat'
import { Chats } from './Chats'
import { ProfileDrawer } from './Drawers/ProfileDrawer'
import { ContactExplorerModal } from './Modals/ContactExplorer'

export const DashboardPage = () => {
  return (
    <Stack direction='row' position='relative'>
      <Chats />
      <ActiveChat />

      <ProfileDrawer />
      <ContactExplorerModal />
    </Stack>
  )
}
