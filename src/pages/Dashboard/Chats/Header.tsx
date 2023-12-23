import { faker } from '@faker-js/faker'
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import {
  BadgeWrapper,
  CircleAvatar,
  TooltipIconbutton,
  TruncatedText,
} from '../../../components'
import { useConstants } from '../../../hooks'

export const Header = () => {
  const theme = useTheme()
  const constants = useConstants()

  return (
    <Box
      sx={{
        py: constants.margin.root.vertical,
        px: constants.margin.root.horizontal,
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
      }}
    >
      <Stack direction='row' alignItems='center'>
        <BadgeWrapper vertical='bottom' horizontal='right' ripple={true}>
          <CircleAvatar src={faker.image.avatarLegacy()} />
        </BadgeWrapper>

        {/* User info */}
        <Stack
          sx={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={() => console.log('Config modal')}
          ml={2}
        >
          <Typography
            component='p'
            color='text.secondary'
            fontSize={14}
            variant='body2'
            letterSpacing={0.4}
          >
            Good Morning
          </Typography>
          <TruncatedText
            fontWeight={constants.fonts.title.weight}
            textOverflow='ellipsis'
            text={faker.person.fullName()}
          />
        </Stack>

        <Box flex={1} />

        {/* Actions */}
        <Stack
          direction='row'
          ml={{
            xs: 3,
            md: 5,
            lg: 7,
          }}
          spacing={1.6}
        >
          <TooltipIconbutton size='large' tooltipTitle='Start new chat'>
            <AddIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>

          <BadgeWrapper bgcolor={theme.palette.error.main} size={12} shadow={false}>
            <TooltipIconbutton size='large' tooltipTitle='Notifications'>
              <NotificationsIcon color='inherit' fontSize='small' />
            </TooltipIconbutton>
          </BadgeWrapper>

          <TooltipIconbutton size='large' tooltipTitle='Search messages'>
            <SearchIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>
        </Stack>
      </Stack>
    </Box>
  )
}
