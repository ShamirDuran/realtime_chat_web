import { faker } from '@faker-js/faker'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import { Chat as ChatModel } from '../../../api/models'
import { CircleAvatar, CircleContainer, TruncatedText } from '../../../components'
import { useStyles } from '../../../hooks'
import { upperCammelCase } from '../../../utils'

interface Props {
  isActive?: boolean
  data: ChatModel
}

export const Chat = ({ data, isActive = false }: Props) => {
  const styles = useStyles()
  const theme = useTheme()
  const unreadMessageCount = faker.number.int({ min: 0, max: 2 })
  const user = data.participants[0].user

  return (
    <Box
      sx={{
        flex: 1,
        mx: styles.margin.root.horizontal / 2,
        px: styles.margin.root.horizontal / 2,
        py: styles.margin.root.vertical / 2,
        borderRadius: 3,
        bgcolor: isActive ? theme.palette.action.selected : 'transparent',
        color: isActive ? 'white' : 'inherit',
        transitionDuration: '0.125s',
        userSelect: 'none',
        '&:hover': {
          bgcolor: isActive ? theme.palette.action.selected : theme.palette.action.focus,
          cursor: 'pointer',
        },
      }}
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
            <Typography variant='caption' color={isActive ? 'white' : 'text.secondary'}>
              {moment(faker.date.anytime()).format('hh:ss')}
            </Typography>
          </Stack>

          <Stack direction='row' display='flex' justifyContent='space-between' flex={1}>
            <TruncatedText
              component='p'
              variant='body2'
              color='text.secondary'
              text={data.messages[0].content}
              mr={2}
            />
            {unreadMessageCount > 0 && (
              <CircleContainer
                size={20}
                bgcolor={theme.palette.error.main}
                color={theme.palette.error.contrastText}
              >
                <small>{unreadMessageCount}</small>
              </CircleContainer>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
