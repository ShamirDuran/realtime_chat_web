import { Typography, TypographyProps } from '@mui/material'

interface Props extends TypographyProps {
  text: string
  maxLines?: number
}

export const TruncatedText = ({ text, maxLines = 1, ...rest }: Props) => {
  return (
    <Typography
      sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
      }}
      {...rest}
    >
      {text}
    </Typography>
  )
}
