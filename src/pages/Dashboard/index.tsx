import { Stack } from '@mui/material'
import { ActiveChat } from './ActiveChat'
import { Chats } from './Chats'
import { ProfileDrawer } from './Drawers/ProfileDrawer'
import { ContactExplorerModal } from './Modals/ContactExplorer'
import { useAppSelector } from '../../hooks'
import { selectUiState } from '../../redux/slices/ui.slice'
import { NoActiveChat } from './NoActiveChat'

export const DashboardPage = () => {
  const uiState = useAppSelector(selectUiState)

  return (
    <Stack direction='row' position='relative'>
      <Chats />

      {uiState.activeUserChat ? <ActiveChat /> : <NoActiveChat />}

      <ProfileDrawer />
      <ContactExplorerModal />
    </Stack>
  )
}
