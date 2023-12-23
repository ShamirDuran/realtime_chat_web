import { faker } from '@faker-js/faker'
import { Box, Stack, Typography, styled } from '@mui/material'
import moment from 'moment'

interface Props {
  direction: 'left' | 'right'
}

const Container = styled(Box)<Props>(({ theme, ...props }) => {
  const borderRadius = theme.spacing(6)

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
    padding: '0.8rem 1.5rem',
    width: 'fit-content',
  }
})

const Time = styled(Typography)<Props>(({ theme, ...props }) => ({
  alignSelf: 'flex-end',
  bottom: -12,
  color: props.direction === 'left' ? theme.palette.text.secondary : 'white',
  marginLeft: theme.spacing(2),
  position: 'relative',
  right: -3,
}))

export const Message = () => {
  return (
    <Container direction={'right'}>
      <Stack direction='row'>
        <Typography variant='body2'>Lorem ipsum dolor sit amet.</Typography>
        <Time variant='caption'>{moment(faker.date.anytime()).format('hh:ss')}</Time>
      </Stack>
    </Container>
  )
}
