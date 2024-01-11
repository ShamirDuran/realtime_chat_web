import { Stack } from '@mui/material'
import { useAppSelector, useResponsive } from '../../hooks'
import { selectChatState } from '../../redux/slices/chat.slice'
import { ActiveChat } from './ActiveChat'
import { Chats } from './Chats'
import { ProfileDrawer } from './Drawers/ProfileDrawer'
import { ContactExplorerModal } from './Modals/ContactExplorer'
import { NoActiveChat } from './NoActiveChat'

const MobileLayout = () => {
  const { activeChat } = useAppSelector(selectChatState)

  return (
    <Stack direction='row' height='100%'>
      {activeChat ? <ActiveChat /> : <Chats />}

      <ProfileDrawer />
      <ContactExplorerModal />
    </Stack>
  )
}

const DesktopLayout = () => {
  const { activeChat } = useAppSelector(selectChatState)

  return (
    <Stack direction='row' height='100%'>
      <Chats />

      {activeChat ? <ActiveChat /> : <NoActiveChat />}

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
