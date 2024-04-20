import { faker } from '@faker-js/faker'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Chat as ChatModel } from '../../../api/models'
import { CircleAvatar, CircleContainer, TruncatedText } from '../../../components'
import { useAppDispatch, useAppSelector, useStyles } from '../../../hooks'
import { selectActiveChat, setActiveChat } from '../../../redux/slices/chat.slice'
import { upperCammelCase } from '../../../utils'
import { selectAuthUser } from '../../../redux/slices/auth.slice'

interface Props {
  data: ChatModel
}

/// Component which represent a direct chat between users
export const Chat = ({ data }: Props) => {
  const styles = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const [isActive, setIsActive] = useState(false)
  const loggedUser = useAppSelector(selectAuthUser)
  const activeChat = useAppSelector(selectActiveChat)
  const unreadMessageCount = faker.number.int({ min: 0, max: 2 })
  const user = data.participants[0].user

  const handleLastMessageTime = () => {
    if (data.messages.length === 0) return ''

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

  // check if the last message is from the logged user
  const isLastMessageFromLoggedUser = () => data.messages[0].from.uid === loggedUser?.uid

  const handleClick = () => {
    dispatch(setActiveChat({ chat: data }))
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
              {handleLastMessageTime()}
            </Typography>
          </Stack>

          <Stack direction='row' display='flex' flex={1}>
            {isLastMessageFromLoggedUser() && (
              <Typography
                variant='body2'
                color={isActive ? 'inherit' : 'text.secondary'}
                fontWeight={500}
                style={{ marginRight: 2.5 }}
              >
                You:
              </Typography>
            )}
            <TruncatedText
              variant='body2'
              color={isActive ? 'inherit' : 'text.secondary'}
              text={data.messages[0].content}
              mr={2}
            />

            <Box flexGrow={1} />

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
