import { Avatar, AvatarProps } from '@mui/material'

interface Props extends AvatarProps {
  src: string
  size?: number
}

export const CircleAvatar = ({ src, size = 46, ...rest }: Props) => {
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
      {...rest}
    />
  )
}
