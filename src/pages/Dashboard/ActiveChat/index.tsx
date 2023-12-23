import { Stack, useTheme } from '@mui/material'
import { useConstants } from '../../../hooks'
import { Header } from './Header'
import { faker } from '@faker-js/faker'
import { Message } from './Message'

export const ActiveChat = () => {
  const constants = useConstants()

  return (
    <Stack
      sx={{
        flexGrow: 1.7,
        maxHeight: '100vh',
      }}
    >
      <Header />

      <Stack
        flexGrow={1}
        bgcolor='background.paper'
        overflow='auto'
        sx={{
          py: constants.margin.root.vertical,
          px: constants.margin.root.horizontal,
        }}
      >
        {[1].map((index) => (
          <Message key={index} />
        ))}
      </Stack>
    </Stack>
  )
}
