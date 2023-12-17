import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Stack, useTheme } from '@mui/material'
import { ActionHeader } from './components/ActionHeader'
import { ChatItem } from './components/ChatItem'
import { ChatSection } from './components/ChatSection'

export const Chats = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: 530,
        height: '100vh',
        borderRight: 1,
        borderRightColor: theme.palette.divider,
        borderRightStyle: 'solid',
      }}
    >
      <Stack>
        {/* Toolbar */}
        <ActionHeader />

        {/* Chats */}
        <ChatSection Icon={PushPinIcon} title='Pinned Message'>
          <Box>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <ChatItem key={index} />
            ))}
          </Box>
        </ChatSection>
      </Stack>
    </Box>
  )
}
