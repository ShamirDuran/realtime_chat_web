import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Stack } from '@mui/material'
import { useAppSelector, useStyles } from '../../../hooks'
import { selectChatState } from '../../../redux/slices/chat.slice'
import { Chat } from './Chat'
import { Section } from './Section'

export const RegularList = () => {
  const styles = useStyles()
  const chatState = useAppSelector(selectChatState)

  return (
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

      <Section Icon={PersonIcon} title='Direct Chats' color={styles.colors.accentGreen}>
        <Box width={'100%'}>
          {chatState.directChats.map((chat) => (
            <Chat key={chat.uid} data={chat} />
          ))}
        </Box>
      </Section>
    </Stack>
  )
}
