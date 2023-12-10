import { faker } from '@faker-js/faker'
import { Stack, Typography, useTheme } from '@mui/material'
import { CircleAvatar, StyledBadge } from '../../../components'
import { StyledIconButton } from '../../../components/ChatElement'
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'

export const ActionHeader = () => {
  const theme = useTheme()

  return (
    <Stack direction='row' alignItems='center'>
      <StyledBadge vertical='bottom' horizontal='right' ripple={true}>
        <CircleAvatar src={faker.image.avatarLegacy()} />
      </StyledBadge>

      {/* User info */}
      <Stack
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          console.log('Config modal')
        }}
        ml={2}
      >
        <Typography color={'text.secondary'} fontSize={14} variant='caption'>
          Good Morning
        </Typography>
        <Typography fontWeight='bold' textOverflow='ellipsis'>
          {faker.person.fullName()}
        </Typography>
      </Stack>

      {/* Actions */}
      <Stack direction='row' ml={6} spacing={1.6}>
        <StyledIconButton size='large' tooltipTitle='Start new chat'>
          <AddIcon color='inherit' fontSize='small' />
        </StyledIconButton>

        <StyledBadge bgcolor={theme.palette.error.main} size={12} shadow={false}>
          <StyledIconButton size='large' tooltipTitle='Notifications'>
            <NotificationsIcon color='inherit' fontSize='small' />
          </StyledIconButton>
        </StyledBadge>

        <StyledIconButton size='large' tooltipTitle='Search messages'>
          <SearchIcon color='inherit' fontSize='small' />
        </StyledIconButton>
      </Stack>
    </Stack>
  )
}
