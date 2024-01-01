import GroupsIcon from '@mui/icons-material/Groups'
import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Stack, useTheme } from '@mui/material'
import { useStyles } from '../../../hooks'
import { Chat } from './Chat'
import { Header } from './Header'
import { Section } from './Section'
import { SearchBar } from './SearchBar'

export const Chats = () => {
  const theme = useTheme()
  const styles = useStyles()

  return (
    <Stack
      sx={{
        borderRight: 1,
        borderRightColor: theme.palette.divider,
        borderRightStyle: 'solid',
        position: 'relative',
        minWidth: styles.dimensions.profileDrawer.width,
        maxWidth: styles.dimensions.profileDrawer.width,
        height: '100vh',
      }}
    >
      {/* Toolbar */}
      <Header />

      <SearchBar />

      {/* Chats */}
      <Stack overflow='auto'>
        <Section
          Icon={PushPinIcon}
          title='Pinned Message'
          color={styles.colors.orange}
          mt={0}
        >
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
