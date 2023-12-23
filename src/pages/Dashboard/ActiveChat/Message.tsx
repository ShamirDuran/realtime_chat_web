import { Box, Typography, styled } from '@mui/material'

interface Props {
  direction: 'left' | 'right'
}

const MessageContainer = styled(Box)<Props>(({ theme, ...props }) => {
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

export const Message = () => {
  return (
    <MessageContainer direction={'left'}>
      <Typography variant='body2'>Lorem ipsum dolor sit amet.</Typography>
    </MessageContainer>
  )
}
