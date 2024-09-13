import { Box, Stack, Typography, useTheme } from '@mui/material'
import data from '../../pages/Dashboard/ActiveChat/data'
import { upperCammelCase } from '../../utils'
import { CircleAvatar } from './CircleAvatar'
import { TruncatedText } from './TruncatedText'
import { useStyles } from '../../hooks'
import { User } from '../../api/models'

interface Props {
  user: User
  onClick: (user: User) => void
}

export const ContactTile = ({ user, onClick }: Props) => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <Box
      sx={{
        flex: 1,
        mx: styles.margin.root.horizontal / 2,
        px: styles.margin.root.horizontal / 2,
        py: styles.margin.root.vertical / 2,
        borderRadius: 3,
        transitionDuration: '0.125s',
        userSelect: 'none',
        '&:hover': {
          bgcolor: theme.palette.action.focus,
          cursor: 'pointer',
        },
      }}
      onClick={() => onClick(user)}
    >
      <Stack direction='row' alignItems='center'>
        <CircleAvatar src={user.avatar} fullName={user.fullName} size={53} />

        <Stack ml={2} flex={1}>
          <Stack
            direction='row'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <TruncatedText
              variant='subtitle1'
              fontWeight={styles.fonts.title.weight}
              text={upperCammelCase(user.fullName)}
            />
            <Typography variant='caption' color={'text.secondary'}></Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
