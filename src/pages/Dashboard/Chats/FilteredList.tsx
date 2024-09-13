import ChatIcon from '@mui/icons-material/Chat'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useStyles } from '../../../hooks'
import {
  selectSearchValue,
  toggleContactExplorerModal,
} from '../../../redux/slices/ui.slice'
import { Section } from './Section'
import { ChatService } from '../../../api/services'
import { Chat as ChatModel, User } from '../../../api/models'
import { Chat } from './Chat'
import { toast } from 'sonner'
import { ContactTile } from '../../../components'
import { socket } from '../../../socket'
import { selectAuthState } from '../../../redux/slices/auth.slice'

export const FilteredList = () => {
  const styles = useStyles()
  const [usersWithRegex, setUsersWithRegex] = useState<User[]>([])
  const [chatsWithRegex, setChatsWithRegex] = useState<ChatModel[]>([])
  const searchValue = useAppSelector(selectSearchValue)
  const authState = useAppSelector(selectAuthState)

  useEffect(() => {
    if (!searchValue) return

    ChatService.searchIntoChats(searchValue)
      .then((resp) => {
        setChatsWithRegex(resp.chats ?? [])
        setUsersWithRegex(resp.users ?? [])
      })
      .catch((error) => toast.error('An error occurred while searching chats'))
  }, [searchValue])

  const handleOpenChat = (user: User) => {
    socket.emit('start_chat', { to: user.uid, from: authState.user.uid })
  }

  return (
    <Stack overflow='auto'>
      <Section Icon={ChatIcon} title='Messages' color={styles.colors.purple} mt={0}>
        <Box width={'100%'}>
          {chatsWithRegex.map((chat) => (
            <Chat key={chat.uid} data={chat} fromFilteredList={true} />
          ))}
        </Box>
      </Section>

      <Section Icon={PersonIcon} title='Contacts' color={styles.colors.accentGreen}>
        <Box width={'100%'}>
          {usersWithRegex.map((user) => (
            <ContactTile key={user.uid} user={user} onClick={handleOpenChat} />
          ))}
        </Box>
      </Section>
    </Stack>
  )
}
