import { faker } from '@faker-js/faker'
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import {
  BadgeWrapper,
  CircleAvatar,
  StyledToolbar,
  TooltipIconbutton,
  TruncatedText,
} from '../../../components'
import { useAppDispatch, useStyles } from '../../../hooks'
import { toggleProfileDrawer } from '../../../redux/slices'

export const Header = () => {
  const theme = useTheme()
  const styles = useStyles()
  const dispatch = useAppDispatch()

  const handleOpenProfileDrawer = () => {
    dispatch(toggleProfileDrawer())
  }

  return (
    <StyledToolbar>
      <Stack direction='row' alignItems='center' flex={1}>
        <BadgeWrapper
          vertical='bottom'
          horizontal='right'
          ripple={true}
          onClick={handleOpenProfileDrawer}
        >
          <CircleAvatar src={faker.image.avatarLegacy()} />
        </BadgeWrapper>

        {/* User info */}
        <Stack
          ml={2}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={handleOpenProfileDrawer}
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
            fontWeight={styles.fonts.title.weight}
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
    </StyledToolbar>
  )
}
