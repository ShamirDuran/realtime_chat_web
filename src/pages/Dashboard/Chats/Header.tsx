import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import {
  BadgeWrapper,
  CircleAvatar,
  StyledToolbar,
  TooltipIconbutton,
  TruncatedText,
} from '../../../components'
import { useAppDispatch, useAppSelector, useMenu, useStyles } from '../../../hooks'
import { selectAuthUser } from '../../../redux/slices/auth.slice'
import {
  toggleContactExplorerModal,
  toggleProfileDrawer,
} from '../../../redux/slices/ui.slice'
import { socket } from '../../../socket'
import { upperCammelCase } from '../../../utils'
import { MainMenu } from './Menus/MainMenu'

export const Header = () => {
  const theme = useTheme()
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const [menuRef, isMenuOpen, handleOpenMenu, handleCloseMenu] = useMenu()
  const user = useAppSelector(selectAuthUser)
  const [socketConnected, setSocketConnected] = React.useState(false)

  const handleOpenProfileDrawer = () => {
    dispatch(toggleProfileDrawer())
  }

  const handleOpenContactExplorerModal = () => {
    dispatch(toggleContactExplorerModal())
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

  React.useEffect(() => {
    socket?.on('connect', () => setSocketConnected(true))
    socket?.on('disconnect', () => setSocketConnected(false))

    return () => {
      socket?.off('connect')
      socket?.off('disconnect')
    }
  }, [socket])

  return (
    <StyledToolbar>
      <Stack direction='row' alignItems='center' flex={1}>
        <Box
          onClick={handleOpenProfileDrawer}
          sx={{ cursor: 'pointer', display: 'flex' }}
        >
          <BadgeWrapper
            bgcolor={
              socketConnected ? theme.palette.success.main : theme.palette.error.main
            }
            vertical='bottom'
            horizontal='right'
            ripple={socketConnected}
          >
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
              text={upperCammelCase(user.fullName)}
            />
          </Stack>
        </Box>

        <Box flex={1} />

        {/* Actions */}
        <Stack
          direction='row'
          alignItems='center'
          ml={{
            md: 3,
            lg: 6,
          }}
          spacing={{
            xs: 0.8,
            sm: 1,
            md: 1.2,
          }}
        >
          <TooltipIconbutton
            tooltipTitle='Start new chat'
            onClick={handleOpenContactExplorerModal}
          >
            <AddIcon fontSize='small' color='inherit' />
          </TooltipIconbutton>

          <BadgeWrapper bgcolor={theme.palette.error.main} size={12} shadow={false}>
            <TooltipIconbutton tooltipTitle='Notifications'>
              <NotificationsIcon fontSize='small' color='inherit' />
            </TooltipIconbutton>
          </BadgeWrapper>

          <TooltipIconbutton tooltipTitle='Menu' onClick={handleOpenMenu}>
            <MoreVertIcon fontSize='small' color='inherit' />
          </TooltipIconbutton>
        </Stack>
      </Stack>

      <MainMenu menuRef={menuRef} isOpen={isMenuOpen} handleClose={handleCloseMenu} />
    </StyledToolbar>
  )
}
