import { Avatar, AvatarProps } from '@mui/material'

interface Props extends AvatarProps {
  src?: string
  size?: number
  fullName?: string
}

const getUserNameInitials = (name: string) => {
  if (name === '') return ''
  return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
}

const generateBackground = (name: string) => {
  let hash = 0
  let i

  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  // name.charCodeAt() return an int between 0 and 65535
  // left shift (<<)  operator moves to left by number of specified
  // bites after <<. The whole for loop will create a color hash
  // based on username length
  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

export const CircleAvatar = ({ src, fullName = '', size = 46, ...rest }: Props) => {
  return (
    <Avatar
      src={src}
      sx={{
        borderWidth: 1,
        borderColor: 'grey.300',
        backgroundColor: generateBackground(fullName),
        borderStyle: 'solid',
        width: size,
        height: size,
      }}
      {...rest}
    >
      {getUserNameInitials(fullName).toUpperCase()}
    </Avatar>
  )
}
