import { Box, Stack, useTheme } from '@mui/material'
import { ActionHeader } from './components/ActionHeader'

export const MainPanel = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        borderRight: '1px solid black',
      }}
    >
      <Stack>
        {/* Toolbar */}
        <ActionHeader />

        {/* Chats */}
        <></>
      </Stack>
    </Box>
  )
}
