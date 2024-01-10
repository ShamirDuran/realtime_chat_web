import GroupsIcon from '@mui/icons-material/Groups'
import PushPinIcon from '@mui/icons-material/PushPin'
import { Box, Stack, useTheme } from '@mui/material'
import { SearchBar } from '../../../components'
import { useResponsive, useStyles } from '../../../hooks'
import { Chat } from './Chat'
import { Header } from './Header'
import { Section } from './Section'

export const Chats = () => {
  const theme = useTheme()
  const styles = useStyles()
  const isMobile = useResponsive({ query: 'down', key: 'sm' })

  return (
    <Stack
      sx={{
        borderRight: !isMobile ? 1 : 0,
        borderRightColor: theme.palette.divider,
        borderRightStyle: 'solid',
        minWidth: !isMobile ? styles.dimensions.profileDrawer.width : '100vw',
        maxWidth: styles.dimensions.profileDrawer.width,
      }}
    >
      {/* Toolbar */}
      <Header />

      <SearchBar
        mx={styles.margin.root.horizontal}
        my={isMobile ? 1.5 : 2.3}
        handleSearch={() => {}}
      />

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
