import { Box, Stack } from '@mui/material'
import { MainPanel } from './MainPanel'
import { ActiveChat } from './ActiveChat'

export const DashboardPage = () => {
  return (
    <Stack direction='row'>
      <MainPanel />
      <ActiveChat />

      {/* Active sidebar */}
      <></>
    </Stack>
  )
}
