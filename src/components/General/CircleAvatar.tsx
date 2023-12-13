import { Avatar } from '@mui/material'

interface Props {
  src: string
  size?: number
}

export const CircleAvatar = ({ src, size = 46 }: Props) => {
  return (
    <Avatar
      src={src}
      sx={{
        borderWidth: 1,
        borderColor: 'grey.300',
        borderStyle: 'solid',
        width: size,
        height: size,
      }}
    />
  )
}
