import { faker } from '@faker-js/faker'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import {
  BadgeWrapper,
  CircleAvatar,
  StyledToolbar,
  TooltipIconbutton,
  TruncatedText,
} from '../../../components'
import { useAppDispatch, useAppSelector, useMenu, useStyles } from '../../../hooks'
import { toggleProfileDrawer } from '../../../redux/slices/ui.slice'
import { MainMenu } from './Menus/MainMenu'
import { selectAuthUser } from '../../../redux/slices/auth.slice'
import { upperCammelCase } from '../../../utils'

export const Header = () => {
  const theme = useTheme()
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const [menuRef, isMenuOpen, handleOpenMenu, handleCloseMenu] = useMenu()
  const user = useAppSelector(selectAuthUser)

  const handleOpenProfileDrawer = () => {
    dispatch(toggleProfileDrawer())
  }

  const getWelcomeMessage = () => {
    const hours = new Date().getHours()
    if (hours < 12) {
      return 'Good Morning'
    } else if (hours >= 12 && hours <= 17) {
      return 'Good Afternoon'
    } else if (hours >= 17 && hours <= 24) {
      return 'Good Evening'
    }
  }

  return (
    <StyledToolbar>
      <Stack direction='row' alignItems='center' flex={1}>
        <Box
          onClick={handleOpenProfileDrawer}
          sx={{ cursor: 'pointer', display: 'flex' }}
        >
          <BadgeWrapper vertical='bottom' horizontal='right' ripple={true}>
            <CircleAvatar src={user?.avatar ?? ''} />
          </BadgeWrapper>

          {/* User info */}
          <Stack
            justifyContent={'center'}
            sx={{ cursor: 'pointer', userSelect: 'none', ml: 2, pt: 0.5 }}
          >
            <Typography
              component='p'
              color='text.secondary'
              fontSize={styles.fonts.subtitle.fontSize}
              variant='body2'
              letterSpacing={0.4}
            >
              {getWelcomeMessage()}
            </Typography>
            <TruncatedText
              fontWeight={styles.fonts.title.weight}
              textOverflow='ellipsis'
              text={`${upperCammelCase(user?.firstName!)} ${upperCammelCase(
                user?.lastName!,
              )}`}
            />
          </Stack>
        </Box>

        <Box flex={1} />

        {/* Actions */}
        <Stack
          direction='row'
          ml={{
            xs: 3,
            md: 5,
            lg: 6,
          }}
          spacing={1.2}
        >
          <TooltipIconbutton size='large' tooltipTitle='Start new chat'>
            <AddIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>

          <BadgeWrapper bgcolor={theme.palette.error.main} size={12} shadow={false}>
            <TooltipIconbutton size='large' tooltipTitle='Notifications'>
              <NotificationsIcon color='inherit' fontSize='small' />
            </TooltipIconbutton>
          </BadgeWrapper>

          <TooltipIconbutton size='large' tooltipTitle='Menu' onClick={handleOpenMenu}>
            <MoreVertIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>
        </Stack>
      </Stack>

      <MainMenu menuRef={menuRef} isOpen={isMenuOpen} handleClose={handleCloseMenu} />
    </StyledToolbar>
  )
}
