import { Box, Stack, useTheme } from '@mui/material'
import { ActionHeader } from './components/ActionHeader'

export const MainPanel = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'relative',
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
        <></>
      </Stack>
    </Box>
  )
}
