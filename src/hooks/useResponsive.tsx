import { Breakpoint, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props {
  query: 'up' | 'down' | 'between' | 'only'
  key?: Breakpoint
  start?: Breakpoint
  end?: Breakpoint
}

export const useResponsive = (props: Props) => {
  const theme = useTheme()

  if (props.query === 'up' && props.key) {
    return useMediaQuery(theme.breakpoints.up(props.key))
  }

  if (props.query === 'down' && props.key) {
    return useMediaQuery(theme.breakpoints.down(props.key))
  }

  if (props.query === 'between' && props.start && props.end) {
    return useMediaQuery(theme.breakpoints.between(props.start, props.end))
  }

  if (props.query === 'only' && props.key) {
    return useMediaQuery(theme.breakpoints.only(props.key))
  }

  return null
}
