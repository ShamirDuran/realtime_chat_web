import PushPinIcon from '@mui/icons-material/PushPin'
import GroupsIcon from '@mui/icons-material/Groups'
import { Box, Stack, useTheme } from '@mui/material'
import { Header } from './Header'
import { Chat } from './Chat'
import { Section } from './Section'
import { useConstants } from '../../../hooks'

export const Chats = () => {
  const theme = useTheme()
  const constants = useConstants()

  return (
    <Stack
      sx={{
        flexGrow: 1,
        maxWidth: 530,
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
        <Section
          Icon={PushPinIcon}
          title='Pinned Message'
          color={constants.colors.orange}
        >
          <Box>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Chat key={index} />
            ))}
          </Box>
        </Section>

        <Section Icon={GroupsIcon} title='Group Message' color={constants.colors.blue}>
          <Box>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Chat key={index} />
            ))}
          </Box>
        </Section>

        <Section
          Icon={GroupsIcon}
          title='All Message'
          color={constants.colors.accentGreen}
        >
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
