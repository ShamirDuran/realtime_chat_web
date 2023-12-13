import { Box, Stack, useTheme } from '@mui/material'
import { ActionHeader } from './components/ActionHeader'
import { ChatItem } from './components/ChatItem'

export const MainPanel = () => {
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
        <ChatItem />
      </Stack>
    </Box>
  )
}
