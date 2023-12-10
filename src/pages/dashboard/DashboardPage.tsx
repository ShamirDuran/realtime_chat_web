import { Box, Stack } from '@mui/material'
import { MainPanel } from './MainPanel'
import { ActiveChat } from './ActiveChat'

export const DashboardPage = () => {
  return (
    <Stack px={2} py={2} direction='row'>
      <MainPanel />
      <ActiveChat />

      {/* Active sidebar */}
      <></>
    </Stack>
  )
}
