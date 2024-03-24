import GroupsIcon from '@mui/icons-material/Groups'
import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Stack, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { Chat as ChatModel } from '../../../api/models'
import { SearchBar } from '../../../components'
import { useAppDispatch, useAppSelector, useResponsive, useStyles } from '../../../hooks'
import { selectAuthState } from '../../../redux/slices/auth.slice'
import { selectChatState, setDirectChats } from '../../../redux/slices/chat.slice'
import { socket } from '../../../socket'
import { Chat } from './Chat'
import { Header } from './Header'
import { Section } from './Section'

export const Chats = () => {
  const theme = useTheme()
  const styles = useStyles()
  const isMobile = useResponsive({ query: 'down', key: 'sm' })
  const authState = useAppSelector(selectAuthState)
  const chatState = useAppSelector(selectChatState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!socket) return

    socket.emit('get_all_chats', { uid: authState.user.uid }, (data: ChatModel[]) => {
      dispatch(setDirectChats({ chats: data }))
    })
  }, [socket])

  return (
    <Stack
      sx={{
        borderRight: !isMobile ? 1 : 0,
        borderRightColor: theme.palette.divider,
        borderRightStyle: 'solid',
        minWidth: !isMobile ? styles.dimensions.profileDrawer.width : '100vw',
        maxWidth: styles.dimensions.profileDrawer.width,
      }}
    >
      {/* Toolbar */}
      <Header />

      <SearchBar
        mx={styles.margin.root.horizontal}
        my={isMobile ? 1.5 : 2.3}
        handleSearch={() => {}}
      />

      {/* Chats */}
      <Stack overflow='auto'>
        <Section
          Icon={PushPinIcon}
          title='Pinned Chats'
          color={styles.colors.orange}
          mt={0}
        >
          <Box>
            {/* {[].map((_, index) => (
              <Chat key={index} />
            ))} */}
          </Box>
        </Section>

        <Section Icon={GroupsIcon} title='Group Chats' color={styles.colors.purple}>
          <Box>
            {/* {[].map((_, index) => (
              <Chat key={index} />
            ))} */}
          </Box>
        </Section>

        <Section Icon={GroupsIcon} title='Direct Chats' color={styles.colors.accentGreen}>
          <Box width={'100%'}>
            {chatState.directChats.map((chat) => (
              <Chat key={chat.uid} data={chat} />
            ))}
          </Box>
        </Section>
      </Stack>
    </Stack>
  )
}
