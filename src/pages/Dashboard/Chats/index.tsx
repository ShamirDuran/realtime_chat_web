import PushPinIcon from '@mui/icons-material/PushPin'
import GroupsIcon from '@mui/icons-material/Groups'
import { Box, Stack, useTheme } from '@mui/material'
import { Header } from './Header'
import { Chat } from './Chat'
import { Section } from './Section'
import { useStyles } from '../../../hooks'

export const Chats = () => {
  const theme = useTheme()
  const styles = useStyles()

  return (
    <Stack
      sx={{
        flexGrow: 1,
        width: '100%',
        maxWidth: 520,
        height: '100vh',
        borderRight: 1,
        borderRightColor: theme.palette.divider,
        borderRightStyle: 'solid',
      }}
    >
      {/* Toolbar */}
      <Header />

      {/* Chats */}
      <Stack overflow='auto'>
        <Section Icon={PushPinIcon} title='Pinned Message' color={styles.colors.orange}>
          <Box>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Chat key={index} />
            ))}
          </Box>
        </Section>

        <Section Icon={GroupsIcon} title='Group Message' color={styles.colors.purple}>
          <Box>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Chat key={index} />
            ))}
          </Box>
        </Section>

        <Section Icon={GroupsIcon} title='All Message' color={styles.colors.accentGreen}>
          <Box>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Chat key={index} />
            ))}
          </Box>
        </Section>
      </Stack>
    </Stack>
  )
}
