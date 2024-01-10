import { Stack } from '@mui/material'
import { ActiveChat } from './ActiveChat'
import { Chats } from './Chats'
import { ProfileDrawer } from './Drawers/ProfileDrawer'
import { ContactExplorerModal } from './Modals/ContactExplorer'
import { useAppSelector, useResponsive } from '../../hooks'
import { selectUiState } from '../../redux/slices/ui.slice'
import { NoActiveChat } from './NoActiveChat'

const MobileLayout = () => {
  const uiState = useAppSelector(selectUiState)

  return (
    <Stack direction='row' position='relative'>
      {uiState.activeUserChat ? <ActiveChat /> : <Chats />}

      <ProfileDrawer />
      <ContactExplorerModal />
    </Stack>
  )
}

const DesktopLayout = () => {
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

export const DashboardPage = () => {
  const isMobile = useResponsive({ query: 'down', key: 'sm' })

  if (isMobile) return <MobileLayout />
  return <DesktopLayout />
}
