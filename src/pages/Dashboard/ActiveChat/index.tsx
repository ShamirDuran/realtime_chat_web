import { Stack } from '@mui/material'
import { useStyles } from '../../../hooks'
import { Header } from './Header'
import { Message } from './Message'

export const ActiveChat = () => {
  const styles = useStyles()

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
          py: styles.margin.root.vertical,
          px: styles.margin.root.horizontal,
        }}
      >
        {[1].map((index) => (
          <Message key={index} />
        ))}
      </Stack>
    </Stack>
  )
}
