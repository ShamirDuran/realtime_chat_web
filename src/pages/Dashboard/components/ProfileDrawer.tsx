import { Box, Collapse, useTheme } from '@mui/material'
import { useAppSelector, useStyles } from '../../../hooks'
import { selectProfileDrawer } from '../../../redux/slices'
import { ProfileDrawerHeader } from './ProfileDrawerHeader'
import { ProfileDrawerBody } from './ProfileDrawerBody'

export const ProfileDrawer = () => {
  const theme = useTheme()
  const styles = useStyles()
  const profileDrawerState = useAppSelector(selectProfileDrawer)

  return (
    <Collapse
      orientation='horizontal'
      in={profileDrawerState}
      sx={{
        position: 'absolute',
        bgcolor: theme.palette.background.default,
        borderRightWidth: 1,
        borderRightColor: theme.palette.divider,
        borderRightStyle: 'solid',
        boxShadow: theme.shadows[1],
        zIndex: 5,
      }}
    >
      <Box
        sx={{
          width: styles.dimensions.profileDrawer.width,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        {/* Toolbar */}
        <ProfileDrawerHeader />

        {/* Content */}
        <ProfileDrawerBody />
      </Box>
    </Collapse>
  )
}
