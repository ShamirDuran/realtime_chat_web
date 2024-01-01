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
        <Box
          onClick={handleOpenProfileDrawer}
          sx={{ cursor: 'pointer', display: 'flex' }}
        >
          <BadgeWrapper vertical='bottom' horizontal='right' ripple={true}>
            <CircleAvatar src={faker.image.avatarLegacy()} />
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
              Good Morning
            </Typography>
            <TruncatedText
              fontWeight={styles.fonts.title.weight}
              textOverflow='ellipsis'
              text={faker.person.fullName()}
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

          <TooltipIconbutton size='large' tooltipTitle='Menu'>
            <MoreVertIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>
        </Stack>
      </Stack>
    </StyledToolbar>
  )
}
