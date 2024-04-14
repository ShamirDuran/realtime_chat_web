import { faker } from '@faker-js/faker'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Chat as ChatModel } from '../../../api/models'
import { CircleAvatar, CircleContainer, TruncatedText } from '../../../components'
import { useAppSelector, useStyles } from '../../../hooks'
import { upperCammelCase } from '../../../utils'
import { selectActiveChat } from '../../../redux/slices/chat.slice'
import { socket } from '../../../socket'
import { selectAuthState } from '../../../redux/slices/auth.slice'

interface Props {
  data: ChatModel
}

/// Component which represent a direct chat between users
export const Chat = ({ data }: Props) => {
  const styles = useStyles()
  const theme = useTheme()

  const [isActive, setIsActive] = useState(false)
  const activeChat = useAppSelector(selectActiveChat)
  const unreadMessageCount = faker.number.int({ min: 0, max: 2 })
  const user = data.participants[0].user
  const authState = useAppSelector(selectAuthState)

  const handleLastMessageString = () => {
    const lastMessageDate = moment(data.messages[0].createdAt)
    const lastMessageTime = moment(data.messages[0].createdAt).format('HH:mm')
    const yesterdayDate = moment().clone().subtract(1, 'day')
    const morningFlag = moment('12:00:00', 'HH:mm')

    if (lastMessageDate.isSame(yesterdayDate, 'day')) return 'Yesterday'

    if (!lastMessageDate.isSame(moment(), 'day'))
      return lastMessageDate.format('DD/MM/YYYY')

    const isMorning = moment(lastMessageTime, 'HH:mm').isBefore(morningFlag)!!
    return `${lastMessageTime} ${isMorning ? 'a. m.' : 'p. m.'} `
  }

  const handleClick = () => {
    socket.emit('start_chat', { to: user.uid, from: authState.user.uid })
  }

  useEffect(() => {
    setIsActive(activeChat?.uid === data.uid)
  }, [activeChat])

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
      onClick={handleClick}
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
              {handleLastMessageString()}
            </Typography>
          </Stack>

          <Stack direction='row' display='flex' justifyContent='space-between' flex={1}>
            <TruncatedText
              component='p'
              variant='body2'
              color={isActive ? 'inherit' : 'text.secondary'}
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
