import { Box, styled } from '@mui/material'

interface Props {
  size: number
  bgcolor: string
  color: string
}

export const CircleContainer = styled(Box)<Props>((props) => ({
  backgroundColor: props.bgcolor,
  color: props.color,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  width: props.size,
  height: props.size,
}))
