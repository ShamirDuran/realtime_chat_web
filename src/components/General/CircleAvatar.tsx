import { Avatar } from '@mui/material'

interface Props {
  src: string
}

export const CircleAvatar = ({ src }: Props) => {
  return (
    <Avatar
      src={src}
      sx={{
        borderWidth: 1,
        borderColor: 'grey.300',
        borderStyle: 'solid',
        width: 46,
        height: 46,
      }}
    />
  )
}
