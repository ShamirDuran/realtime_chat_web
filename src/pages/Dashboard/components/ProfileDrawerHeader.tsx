import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton, Stack, Typography, useTheme } from '@mui/material'
import { StyledToolbar } from '../../../components'
import { useAppDispatch } from '../../../hooks'
import { toggleProfileDrawer } from '../../../redux/slices'

export const ProfileDrawerHeader = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  return (
    <StyledToolbar
      sx={{
        width: '100%',
        height: theme.spacing(16),
        backgroundColor: theme.palette.action.selected,
        color: theme.palette.primary.contrastText,
        alignItems: 'flex-end',
      }}
    >
      <Stack direction='row' alignItems='center'>
        <IconButton
          onClick={() => dispatch(toggleProfileDrawer())}
          size='small'
          disableRipple
        >
          <ArrowBackIcon sx={{ color: theme.palette.primary.contrastText }} />
        </IconButton>

        <Typography fontWeight='500' component='h1' variant='h6' ml={1.5}>
          Profile
        </Typography>
      </Stack>
    </StyledToolbar>
  )
}
