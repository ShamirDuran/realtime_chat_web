import { Box, Stack, Typography, styled } from '@mui/material'
import moment from 'moment'
import { Message as MessageData } from '../../../api/models'
import { useAppSelector } from '../../../hooks'
import { selectAuthUser } from '../../../redux/slices/auth.slice'

interface Props {
  message: MessageData
}

interface ContainerProps {
  direction: 'left' | 'right'
}

interface TimeProps {
  color: string
}

const Container = styled(Box)<ContainerProps>(({ theme, ...props }) => {
  const borderRadius = theme.spacing(3)

  return {
    alignSelf: props.direction === 'left' ? 'flex-start' : 'flex-end',
    backgroundColor:
      props.direction === 'left'
        ? theme.palette.background.default
        : theme.palette.action.selected,
    borderTopLeftRadius: props.direction === 'left' ? '0' : borderRadius,
    borderTopRightRadius: props.direction === 'right' ? '0' : borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    color: props.direction == 'left' ? 'inherit' : 'white',
    padding: '0.6rem 1.2rem',
    width: 'fit-content',
  }
})

const Time = styled(Typography)<TimeProps>(({ theme, ...props }) => ({
  alignSelf: 'flex-end',
  bottom: -5,
  right: -6,
  marginLeft: theme.spacing(2),
  color: props.color,
  position: 'relative',
}))

export const Message = ({ message }: Props) => {
  const { content, from, createdAt } = message
  const loggedUser = useAppSelector(selectAuthUser)

  return (
    <Container
      direction={from.uid == loggedUser.uid ? 'right' : 'left'}
      sx={{
        maxWidth: {
          xs: '90%',
          md: '85%',
          lg: '70%',
          xl: '65%',
        },
      }}
    >
      <Stack direction='row'>
        <Typography variant='body2' lineHeight='20px'>
          {content}
        </Typography>

        <Time
          color={from.uid == loggedUser.uid ? 'white' : 'text.secondary'}
          variant='caption'
        >
          {moment(createdAt).format('hh:ss')}
        </Time>
      </Stack>
    </Container>
  )
}
