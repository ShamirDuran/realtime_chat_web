import { Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

interface WrapperProps {
  maxLines: number
}

interface TruncatedTextProps extends TypographyProps {
  text: string
  maxLines?: number
}

const TruncatedTextWrapper = styled(({ text, maxLines, ...rest }: TruncatedTextProps) => (
  <Typography {...rest}>{text}</Typography>
))<WrapperProps>(({ maxLines }) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: maxLines,
  WebkitBoxOrient: 'vertical',
}))

export const TruncatedText = ({ text, maxLines = 1, ...rest }: TruncatedTextProps) => (
  <TruncatedTextWrapper text={text} maxLines={maxLines} {...rest} />
)
