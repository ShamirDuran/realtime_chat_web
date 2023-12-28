import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Collapse, IconButton, Toolbar, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector, useStyles } from '../../../hooks'
import { selectProfileDrawer, toggleProfileDrawer } from '../../../redux/slices'

export const ProfileDrawer = () => {
  const styles = useStyles()
  const profileDrawerState = useAppSelector(selectProfileDrawer)
  const dispatch = useAppDispatch()

  return (
    <Collapse
      orientation='horizontal'
      in={profileDrawerState}
      sx={{
        position: 'absolute',
        bgcolor: 'green',
        borderRightWidth: 1,
        borderRightColor: (theme) => theme.palette.divider,
        borderRightStyle: 'solid',
        zIndex: 5,
      }}
    >
      <Box
        sx={{
          width: styles.dimensions.profileDrawer.width,
          height: '100vh',
        }}
      >
        <Toolbar sx={{ bgcolor: 'red' }}>
          <IconButton onClick={() => dispatch(toggleProfileDrawer())} disableRipple>
            <ArrowBackIcon />
          </IconButton>
          <Typography>Profile</Typography>
        </Toolbar>

        <Typography>Profile</Typography>
      </Box>
    </Collapse>
  )
}
